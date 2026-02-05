/**
 * Stateless Session Management
 * 
 * Uses signed tokens instead of server-side storage.
 * Works with serverless/cloud environments that sleep (Render, Heroku, etc.)
 */

import { createHmac, timingSafeEqual } from 'crypto';

const SESSION_SECRET = process.env.SESSION_SECRET || 'default-secret-change-me-in-production';
const MAX_SESSION_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

interface SessionData {
  createdAt: number;
  version: string;
}

/**
 * Create a stateless session token
 * Format: base64(data).signature
 */
export function createSession(): string {
  const data: SessionData = {
    createdAt: Date.now(),
    version: '1.0',
  };
  
  const dataStr = JSON.stringify(data);
  const dataB64 = Buffer.from(dataStr).toString('base64url');
  const signature = signData(dataB64);
  
  return `${dataB64}.${signature}`;
}

/**
 * Validate a stateless session token
 * Returns session data if valid, null otherwise
 */
export function validateSession(token: string): SessionData | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) {
      console.error('[StatelessSession] Invalid token format');
      return null;
    }
    
    const [dataB64, signature] = parts;
    
    // Verify signature
    const expectedSignature = signData(dataB64);
    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      console.error('[StatelessSession] Invalid signature');
      return null;
    }
    
    // Decode data
    const dataStr = Buffer.from(dataB64, 'base64url').toString('utf-8');
    const data: SessionData = JSON.parse(dataStr);
    
    // Check age
    const age = Date.now() - data.createdAt;
    if (age > MAX_SESSION_AGE) {
      const ageHours = Math.floor(age / (60 * 60 * 1000));
      console.error(`[StatelessSession] Token expired (age: ${ageHours}h)`);
      return null;
    }
    
    console.error(`[StatelessSession] Valid token (age: ${Math.floor(age / 60000)}m)`);
    return data;
  } catch (error: any) {
    console.error(`[StatelessSession] Validation error: ${error.message}`);
    return null;
  }
}

/**
 * Sign data using HMAC-SHA256
 */
function signData(data: string): string {
  const hmac = createHmac('sha256', SESSION_SECRET);
  hmac.update(data);
  return hmac.digest('base64url');
}

/**
 * Get session statistics (for logging)
 */
export function getSessionInfo(token: string): string {
  const data = validateSession(token);
  if (!data) return 'Invalid';
  
  const ageMinutes = Math.floor((Date.now() - data.createdAt) / 60000);
  const ageHours = Math.floor(ageMinutes / 60);
  const ageDays = Math.floor(ageHours / 24);
  
  if (ageDays > 0) return `Valid (${ageDays}d old)`;
  if (ageHours > 0) return `Valid (${ageHours}h old)`;
  return `Valid (${ageMinutes}m old)`;
}

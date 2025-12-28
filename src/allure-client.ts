/**
 * Allure TestOps REST API Client
 * Provides HTTP methods for interacting with Allure TestOps API
 */

export interface AllureConfig {
  baseUrl: string;
  token: string;
}

export interface PageParams {
  page?: number;
  size?: number;
  sort?: string[];
  query?: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export class AllureClient {
  private baseUrl: string;
  private token: string;

  constructor(config: AllureConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
    this.token = config.token;
  }

  private getHeaders(): Record<string, string> {
    return {
      'Authorization': `Api-Token ${this.token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  private buildUrl(path: string, params?: Record<string, any>): string {
    const url = new URL(`${this.baseUrl}${path}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => url.searchParams.append(key, String(v)));
          } else {
            url.searchParams.append(key, String(value));
          }
        }
      });
    }
    return url.toString();
  }

  async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    const url = this.buildUrl(path, params);
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return response.json() as Promise<T>;
  }

  async post<T>(path: string, body?: any, params?: Record<string, any>): Promise<T> {
    const url = this.buildUrl(path, params);
    const response = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return response.json() as Promise<T>;
  }

  async patch<T>(path: string, body: any, params?: Record<string, any>): Promise<T> {
    const url = this.buildUrl(path, params);
    const response = await fetch(url, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return response.json() as Promise<T>;
  }

  async put<T>(path: string, body: any, params?: Record<string, any>): Promise<T> {
    const url = this.buildUrl(path, params);
    const response = await fetch(url, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return response.json() as Promise<T>;
  }

  async delete(path: string, params?: Record<string, any>): Promise<void> {
    const url = this.buildUrl(path, params);
    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
  }

  async postMultipart<T>(
    path: string,
    info: any,
    fileData: Buffer | string,
    fileName: string = 'file.zip',
    params?: Record<string, any>
  ): Promise<T> {
    const url = this.buildUrl(path, params);

    // Create multipart form data
    const boundary = '----Boundary' + Math.random().toString(36).substr(2, 9);
    let body = '';

    // Add info field
    body += `--${boundary}\r\n`;
    body += 'Content-Disposition: form-data; name="info"; filename="info.json"\r\n';
    body += 'Content-Type: application/json\r\n\r\n';
    body += JSON.stringify(info);
    body += '\r\n';

    // Add file field
    body += `--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="file"; filename="${fileName}"\r\n`;
    body += 'Content-Type: application/octet-stream\r\n\r\n';

    // Combine text and binary parts
    const textEncoder = new TextEncoder();
    const textPart = textEncoder.encode(body);
    const binaryFile = typeof fileData === 'string' ? textEncoder.encode(fileData) : fileData;
    const footer = textEncoder.encode(`\r\n--${boundary}--`);

    const combinedBody = Buffer.concat([
      Buffer.from(textPart),
      Buffer.from(binaryFile),
      Buffer.from(footer),
    ]);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Api-Token ${this.token}`,
        'Accept': 'application/json',
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
      },
      body: combinedBody,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[AllureClient] POST multipart ${path} failed:`, {
        status: response.status,
        url: url,
        fileName: fileName,
        responseText: errorText,
      });
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return response.json() as Promise<T>;
  }
}

export function createAllureClient(baseUrl: string, token: string): AllureClient {
  return new AllureClient({ baseUrl, token });
}

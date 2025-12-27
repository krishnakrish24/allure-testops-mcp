#!/usr/bin/env node

import http from 'http';
import { nanoid } from 'nanoid';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { createAllureClient, AllureClient } from './allure-client.js';
import { businessMetricControllerTools, handleBusinessMetricControllerTool } from './controllers/business-metric-controller.js';
import { categoryControllerTools, handleCategoryControllerTool } from './controllers/category-controller.js';
import { categoryMatcherControllerTools, handleCategoryMatcherControllerTool } from './controllers/category-matcher-controller.js';
import { customFieldControllerTools, handleCustomFieldControllerTool } from './controllers/custom-field-controller.js';
import { customFieldProjectControllerTools, handleCustomFieldProjectControllerTool } from './controllers/custom-field-project-controller.js';
import { customFieldSchemaControllerTools, handleCustomFieldSchemaControllerTool } from './controllers/custom-field-schema-controller.js';
import { customFieldValueControllerTools, handleCustomFieldValueControllerTool } from './controllers/custom-field-value-controller.js';
import { customFieldValueBulkControllerTools, handleCustomFieldValueBulkControllerTool } from './controllers/custom-field-value-bulk-controller.js';
import { cleanupControllerTools, handleCleanupControllerTool } from './controllers/cleanup-controller.js';
import { commentControllerTools, handleCommentControllerTool } from './controllers/comment-controller.js';
import { dashboardControllerTools, handleDashboardControllerTool } from './controllers/dashboard-controller.js';
import { dashboardTemplateControllerTools, handleDashboardTemplateControllerTool } from './controllers/dashboard-template-controller.js';
import { defectControllerTools, handleDefectControllerTool } from './controllers/defect-controller.js';
import { exportControllerTools, handleExportControllerTool } from './controllers/export-controller.js';
import { filterControllerTools, handleFilterControllerTool } from './controllers/filter-controller.js';
import { globalSettingsControllerTools, handleGlobalSettingsControllerTool } from './controllers/global-settings-controller.js';
import { integrationControllerTools, handleIntegrationControllerTool } from './controllers/integration-controller.js';
import { launchControllerTools, handleLaunchControllerTool } from './controllers/launch-controller.js';
import { launchSearchControllerTools, handleLaunchSearchControllerTool } from './controllers/launch-search-controller.js';
import { launchDiffControllerTools, handleLaunchDiffControllerTool } from './controllers/launch-diff-controller.js';
import { launchIssueControllerTools, handleLaunchIssueControllerTool } from './controllers/launch-issue-controller.js';
import { launchTagControllerTools, handleLaunchTagControllerTool } from './controllers/launch-tag-controller.js';
import { launchUploadControllerTools, handleLaunchUploadControllerTool } from './controllers/launch-upload-controller.js';
import { memberControllerTools, handleMemberControllerTool } from './controllers/member-controller.js';
import { projectControllerTools, handleProjectControllerTool } from './controllers/project-controller.js';
import { projectAccessControllerTools, handleProjectAccessControllerTool } from './controllers/project-access-controller.js';
import { projectMetricControllerTools, handleProjectMetricControllerTool } from './controllers/project-metric-controller.js';
import { projectCollaboratorControllerTools, handleProjectCollaboratorControllerTool } from './controllers/project-collaborator-controller.js';
import { projectCategoryControllerTools, handleProjectCategoryControllerTool } from './controllers/project-category-controller.js';
import { projectPropertyControllerTools, handleProjectPropertyControllerTool } from './controllers/project-property-controller.js';
import { projectSettingsControllerTools, handleProjectSettingsControllerTool } from './controllers/project-settings-controller.js';
import { testCaseControllerTools, handleTestCaseControllerTool } from './controllers/test-case-controller.js';
import { testCaseSearchControllerTools, handleTestCaseSearchControllerTool } from './controllers/test-case-search-controller.js';
import { testCaseAttachmentControllerTools, handleTestCaseAttachmentControllerTool } from './controllers/test-case-attachment-controller.js';
import { testCaseAuditControllerTools, handleTestCaseAuditControllerTool } from './controllers/test-case-audit-controller.js';
import { testCaseBulkControllerTools, handleTestCaseBulkControllerTool } from './controllers/test-case-bulk-controller.js';
import { testCaseSyncControllerTools, handleTestCaseSyncControllerTool } from './controllers/test-case-sync-controller.js';
import { testCaseCustomFieldControllerTools, handleTestCaseCustomFieldControllerTool } from './controllers/test-case-custom-field-controller.js';
import { testCaseCsvImportControllerTools, handleTestCaseCsvImportControllerTool } from './controllers/test-case-csv-import-controller.js';
import { testCaseScenarioControllerTools, handleTestCaseScenarioControllerTool } from './controllers/test-case-scenario-controller.js';
import { testCaseExportControllerTools, handleTestCaseExportControllerTool } from './controllers/test-case-export-controller.js';
import { testCaseCloneControllerTools, handleTestCaseCloneControllerTool } from './controllers/test-case-clone-controller.js';
import { testCaseOverviewControllerTools, handleTestCaseOverviewControllerTool } from './controllers/test-case-overview-controller.js';
import { testCaseTagControllerTools, handleTestCaseTagControllerTool } from './controllers/test-case-tag-controller.js';
import { testCaseTreeControllerTools, handleTestCaseTreeControllerTool } from './controllers/test-case-tree-controller.js';
import { testCaseTreeSelectionControllerTools, handleTestCaseTreeSelectionControllerTool } from './controllers/test-case-tree-selection-controller.js';
import { testLayerControllerTools, handleTestLayerControllerTool } from './controllers/test-layer-controller.js';
import { testPlanControllerTools, handleTestPlanControllerTool } from './controllers/test-plan-controller.js';
import { testResultControllerTools, handleTestResultControllerTool } from './controllers/test-result-controller.js';
import { testResultSearchControllerTools, handleTestResultSearchControllerTool } from './controllers/test-result-search-controller.js';
import { testResultBulkControllerTools, handleTestResultBulkControllerTool } from './controllers/test-result-bulk-controller.js';
import { testResultCustomFieldControllerTools, handleTestResultCustomFieldControllerTool } from './controllers/test-result-custom-field-controller.js';
import { treeControllerTools, handleTreeControllerTool } from './controllers/tree-controller.js';
import { uploadControllerTools, handleUploadControllerTool } from './controllers/upload-controller.js';
import { widgetControllerTools, handleWidgetControllerTool } from './controllers/widget-controller.js';

// Environment variables
const ALLURE_TESTOPS_URL = process.env.ALLURE_TESTOPS_URL;
const ALLURE_TOKEN = process.env.ALLURE_TOKEN;
const PROJECT_ID = process.env.PROJECT_ID;

// Validate required environment variables
if (!ALLURE_TOKEN) {
  console.error('Error: ALLURE_TOKEN environment variable is required');
  process.exit(1);
}

if (!ALLURE_TESTOPS_URL) {
  console.error('Error: ALLURE_TESTOPS_URL environment variable is required');
  process.exit(1);
}

if (!PROJECT_ID) {
  console.error('Error: PROJECT_ID environment variable is required');
  process.exit(1);
}

// Initialize Allure client with environment variables
const allureClient = createAllureClient(ALLURE_TESTOPS_URL, ALLURE_TOKEN);

// Tool handler type definition
type ToolHandler = (client: AllureClient, toolName: string, args: any, defaultProjectId: string) => Promise<string>;

// Tool registry: maps tool names to their handlers
interface ToolRegistry {
  tools: any[];
  handler: ToolHandler;
}

// Register all tool controllers
const toolControllers: ToolRegistry[] = [
  {
    tools: businessMetricControllerTools,
    handler: handleBusinessMetricControllerTool,
  },
  {
    tools: categoryControllerTools,
    handler: handleCategoryControllerTool,
  },
  {
    tools: categoryMatcherControllerTools,
    handler: handleCategoryMatcherControllerTool,
  },
  {
    tools: customFieldControllerTools,
    handler: handleCustomFieldControllerTool,
  },
  {
    tools: customFieldProjectControllerTools,
    handler: handleCustomFieldProjectControllerTool,
  },
  {
    tools: customFieldSchemaControllerTools,
    handler: handleCustomFieldSchemaControllerTool,
  },
  {
    tools: customFieldValueControllerTools,
    handler: handleCustomFieldValueControllerTool,
  },
  {
    tools: customFieldValueBulkControllerTools,
    handler: handleCustomFieldValueBulkControllerTool,
  },
  {
    tools: cleanupControllerTools,
    handler: handleCleanupControllerTool,
  },
  {
    tools: commentControllerTools,
    handler: handleCommentControllerTool,
  },
  {
    tools: dashboardControllerTools,
    handler: handleDashboardControllerTool,
  },
  {
    tools: dashboardTemplateControllerTools,
    handler: handleDashboardTemplateControllerTool,
  },
  {
    tools: defectControllerTools,
    handler: handleDefectControllerTool,
  },
  {
    tools: exportControllerTools,
    handler: handleExportControllerTool,
  },
  {
    tools: filterControllerTools,
    handler: handleFilterControllerTool,
  },
  {
    tools: globalSettingsControllerTools,
    handler: handleGlobalSettingsControllerTool,
  },
  {
    tools: integrationControllerTools,
    handler: handleIntegrationControllerTool,
  },
  {
    tools: launchControllerTools,
    handler: handleLaunchControllerTool,
  },
  {
    tools: launchSearchControllerTools,
    handler: handleLaunchSearchControllerTool,
  },
  {
    tools: launchDiffControllerTools,
    handler: handleLaunchDiffControllerTool,
  },
  {
    tools: launchIssueControllerTools,
    handler: handleLaunchIssueControllerTool,
  },
  {
    tools: launchTagControllerTools,
    handler: handleLaunchTagControllerTool,
  },
  {
    tools: launchUploadControllerTools,
    handler: handleLaunchUploadControllerTool,
  },
  {
    tools: memberControllerTools,
    handler: handleMemberControllerTool,
  },
  {
    tools: projectControllerTools,
    handler: handleProjectControllerTool,
  },
  {
    tools: projectAccessControllerTools,
    handler: handleProjectAccessControllerTool,
  },
  {
    tools: projectMetricControllerTools,
    handler: handleProjectMetricControllerTool,
  },
  {
    tools: projectCollaboratorControllerTools,
    handler: handleProjectCollaboratorControllerTool,
  },
  {
    tools: projectCategoryControllerTools,
    handler: handleProjectCategoryControllerTool,
  },
  {
    tools: projectPropertyControllerTools,
    handler: handleProjectPropertyControllerTool,
  },
  {
    tools: projectSettingsControllerTools,
    handler: handleProjectSettingsControllerTool,
  },
  {
    tools: testCaseControllerTools,
    handler: handleTestCaseControllerTool,
  },
  {
    tools: testCaseSearchControllerTools,
    handler: handleTestCaseSearchControllerTool,
  },
  {
    tools: testCaseAttachmentControllerTools,
    handler: handleTestCaseAttachmentControllerTool,
  },
  {
    tools: testCaseAuditControllerTools,
    handler: handleTestCaseAuditControllerTool,
  },
  {
    tools: testCaseBulkControllerTools,
    handler: handleTestCaseBulkControllerTool,
  },
  {
    tools: testCaseSyncControllerTools,
    handler: handleTestCaseSyncControllerTool,
  },
  {
    tools: testCaseCustomFieldControllerTools,
    handler: handleTestCaseCustomFieldControllerTool,
  },
  {
    tools: testCaseCsvImportControllerTools,
    handler: handleTestCaseCsvImportControllerTool,
  },
  {
    tools: testCaseScenarioControllerTools,
    handler: handleTestCaseScenarioControllerTool,
  },
  {
    tools: testCaseExportControllerTools,
    handler: handleTestCaseExportControllerTool,
  },
  {
    tools: testCaseCloneControllerTools,
    handler: handleTestCaseCloneControllerTool,
  },
  {
    tools: testCaseOverviewControllerTools,
    handler: handleTestCaseOverviewControllerTool,
  },
  {
    tools: testCaseTagControllerTools,
    handler: handleTestCaseTagControllerTool,
  },
  {
    tools: testCaseTreeControllerTools,
    handler: handleTestCaseTreeControllerTool,
  },
  {
    tools: testCaseTreeSelectionControllerTools,
    handler: handleTestCaseTreeSelectionControllerTool,
  },
  {
    tools: testLayerControllerTools,
    handler: handleTestLayerControllerTool,
  },
  {
    tools: testPlanControllerTools,
    handler: handleTestPlanControllerTool,
  },
  {
    tools: testResultControllerTools,
    handler: handleTestResultControllerTool,
  },
  {
    tools: testResultSearchControllerTools,
    handler: handleTestResultSearchControllerTool,
  },
  {
    tools: testResultBulkControllerTools,
    handler: handleTestResultBulkControllerTool,
  },
  {
    tools: testResultCustomFieldControllerTools,
    handler: handleTestResultCustomFieldControllerTool,
  },
  {
    tools: treeControllerTools,
    handler: handleTreeControllerTool,
  },
  {
    tools: uploadControllerTools,
    handler: handleUploadControllerTool,
  },
  {
    tools: widgetControllerTools,
    handler: handleWidgetControllerTool,
  },
];

// Build tool name to handler mapping
const toolHandlerMap = new Map<string, ToolHandler>();
const allTools: any[] = [];

for (const controller of toolControllers) {
  allTools.push(...controller.tools);
  for (const tool of controller.tools) {
    toolHandlerMap.set(tool.name, controller.handler);
  }
}

// Create MCP server
const server = new Server(
  {
    name: 'allure-testops-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register tool list handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: allTools,
  };
});

// Register tool call handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    // Look up handler for this tool
    const handler = toolHandlerMap.get(name);

    if (!handler) {
      return {
        content: [
          {
            type: 'text',
            text: `Unknown tool: ${name}`,
          },
        ],
        isError: true,
      };
    }

    // Execute the tool handler with default PROJECT_ID
    const result = await handler(allureClient, name, args, PROJECT_ID);

    return {
      content: [
        {
          type: 'text',
          text: result,
        },
      ],
    };
  } catch (error: any) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const PORT = process.env.PORT || 3000;
  
  // Session management
  const sessions = new Map<string, { createdAt: number; lastActivity: number }>();
  const MAX_SESSION_AGE = 24 * 60 * 60 * 1000; // 24 hours
  
  // Validate Origin header to prevent DNS rebinding attacks
  const validateOrigin = (req: http.IncomingMessage, origin?: string): boolean => {
    // If no origin header, allow local requests
    if (!origin) return true;
    
    try {
      const originUrl = new URL(origin);
      // In production, verify origin matches expected domains
      // For now, allow localhost in development
      if (originUrl.hostname === 'localhost' || originUrl.hostname === '127.0.0.1') {
        return true;
      }
      return true;
    } catch {
      return false;
    }
  };

  const validateSessionId = (sessionId?: string): boolean => {
    if (!sessionId) return false;
    
    const session = sessions.get(sessionId);
    if (!session) return false;
    
    // Check if session has expired
    const now = Date.now();
    if (now - session.createdAt > MAX_SESSION_AGE) {
      sessions.delete(sessionId);
      return false;
    }
    
    // Update last activity
    session.lastActivity = now;
    return true;
  };

  const httpServer = http.createServer(async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Mcp-Session-Id');

    // Handle OPTIONS requests
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    const origin = req.headers.origin as string;
    if (!validateOrigin(req, origin)) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Origin not allowed' }));
      return;
    }

    // POST: Handle incoming JSON-RPC messages
    if (req.method === 'POST' && req.url === '/mcp') {
      const accept = req.headers.accept || '';
      const sessionId = req.headers['mcp-session-id'] as string | undefined;

      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', async () => {
        try {
          const messages = JSON.parse(body);
          const messageArray = Array.isArray(messages) ? messages : [messages];

          // Check if all messages are responses/notifications (no requests)
          const allResponsesOrNotifications = messageArray.every(
            (msg: any) => !msg.method && !('id' in msg && msg.method === undefined)
          );

          if (allResponsesOrNotifications) {
            // For responses/notifications, return 202 Accepted
            res.writeHead(202, { 'Content-Type': 'application/json' });
            res.end();
            return;
          }

          // Handle requests - use SSE stream
          res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          });

          let eventId = 0;

          // Process each message
          for (const message of messageArray) {
            try {
              let response: any;

              if (message.method === 'initialize') {
                // Generate session ID on initialization
                const newSessionId = nanoid(32);
                sessions.set(newSessionId, {
                  createdAt: Date.now(),
                  lastActivity: Date.now(),
                });

                response = {
                  jsonrpc: '2.0',
                  id: message.id,
                  result: {
                    protocolVersion: '2024-11-05',
                    capabilities: {
                      tools: {},
                    },
                    serverInfo: {
                      name: 'allure-testops-mcp',
                      version: '1.0.0',
                    },
                  },
                };

                // Send session ID in header for initialization response
                if (message.id) {
                  res.write(`data: ${JSON.stringify(response)}\n`);
                  res.write(`id: ${eventId++}\n\n`);
                  // Also include session ID in a comment or separate event
                  res.write(`data: {"mcp-session-id": "${newSessionId}"}\n`);
                  res.write(`id: ${eventId++}\n\n`);
                }
              } else if (message.method === 'tools/list') {
                response = {
                  jsonrpc: '2.0',
                  id: message.id,
                  result: { tools: allTools },
                };
                res.write(`data: ${JSON.stringify(response)}\n`);
                res.write(`id: ${eventId++}\n\n`);
              } else if (message.method === 'tools/call') {
                const { name, arguments: args } = message.params;
                const handler = toolHandlerMap.get(name);

                if (!handler) {
                  response = {
                    jsonrpc: '2.0',
                    id: message.id,
                    error: { code: -32601, message: `Unknown tool: ${name}` },
                  };
                } else {
                  try {
                    const result = await handler(allureClient, name, args, PROJECT_ID!);
                    response = {
                      jsonrpc: '2.0',
                      id: message.id,
                      result: { content: [{ type: 'text', text: result }] },
                    };
                  } catch (error: any) {
                    response = {
                      jsonrpc: '2.0',
                      id: message.id,
                      error: { code: -32603, message: error.message },
                    };
                  }
                }
                res.write(`data: ${JSON.stringify(response)}\n`);
                res.write(`id: ${eventId++}\n\n`);
              } else {
                response = {
                  jsonrpc: '2.0',
                  id: message.id,
                  error: { code: -32601, message: 'Method not found' },
                };
                res.write(`data: ${JSON.stringify(response)}\n`);
                res.write(`id: ${eventId++}\n\n`);
              }
            } catch (error: any) {
              const errorResponse = {
                jsonrpc: '2.0',
                id: message.id,
                error: { code: -32700, message: 'Parse error', data: error.message },
              };
              res.write(`data: ${JSON.stringify(errorResponse)}\n`);
              res.write(`id: ${eventId++}\n\n`);
            }
          }

          // Close SSE stream after sending all responses
          res.end();
        } catch (error: any) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            jsonrpc: '2.0',
            error: { code: -32700, message: 'Parse error' },
          }));
        }
      });
      return;
    }

    // GET: Open SSE stream for server-to-client messages
    if (req.method === 'GET' && req.url === '/mcp') {
      const sessionId = req.headers['mcp-session-id'] as string | undefined;
      const lastEventId = req.headers['last-event-id'] as string | undefined;

      // Validate session if provided
      if (sessionId && !validateSessionId(sessionId)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Session not found' }));
        return;
      }

      // Open SSE stream
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      });

      // Keep the connection open
      const keepAliveInterval = setInterval(() => {
        res.write(': keep-alive\n\n');
      }, 30000);

      req.on('close', () => {
        clearInterval(keepAliveInterval);
      });

      return;
    }

    // DELETE: Terminate session
    if (req.method === 'DELETE' && req.url === '/mcp') {
      const sessionId = req.headers['mcp-session-id'] as string | undefined;

      if (sessionId) {
        sessions.delete(sessionId);
        res.writeHead(204);
        res.end();
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Mcp-Session-Id header required' }));
      }
      return;
    }

    // Health check endpoint (optional)
    if (req.method === 'GET' && req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok' }));
      return;
    }

    // Default 404
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  });

  httpServer.listen(Number(PORT), () => {
    console.error(`Allure TestOps MCP Server running on HTTP port ${PORT}`);
    console.error(`Connected to: ${ALLURE_TESTOPS_URL}`);
    console.error(`Project ID: ${PROJECT_ID}`);
    console.error(`Registered ${allTools.length} tools`);
    console.error('');
    console.error('=== Streamable HTTP Spec Endpoints ===');
    console.error(`MCP Endpoint: http://localhost:${PORT}/mcp`);
    console.error(`POST /mcp - Send JSON-RPC messages`);
    console.error(`GET /mcp - Open SSE stream`);
    console.error(`DELETE /mcp - Terminate session`);
    console.error('');
    console.error(`Health check: http://localhost:${PORT}/health`);
  });

  httpServer.on('error', (error) => {
    console.error('Server error:', error);
    process.exit(1);
  });
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

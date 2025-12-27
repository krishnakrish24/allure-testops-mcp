#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
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
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Allure TestOps MCP Server running on stdio');
  console.error(`Connected to: ${ALLURE_TESTOPS_URL}`);
  console.error(`Project ID: ${PROJECT_ID}`);
  console.error(`Registered ${allTools.length} tools`);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

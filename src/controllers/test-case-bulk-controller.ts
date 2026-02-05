/**
 * TestCaseBulkController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const testCaseBulkControllerTools = [
    {
      "name": "allure_cfvAdd_1",
      "description": "Add custom field values for all test cases",
      "inputSchema": {
        "type": "object",
        "properties": {
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "body"
        ]
      }
    },
    {
      "name": "allure_cfvRemove_1",
      "description": "Remove custom field values for all test cases",
      "inputSchema": {
        "type": "object",
        "properties": {
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "body"
        ]
      }
    },
    {
      "name": "allure_cloneAll_1",
      "description": "Clone test cases by ids",
      "inputSchema": {
        "type": "object",
        "properties": {
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "body"
        ]
      }
    },
    {
      "name": "allure_dragAndDrop_1",
      "description": "dragAndDrop test cases for trees",
      "inputSchema": {
        "type": "object",
        "properties": {
          "body": {
            "type": "object",
            "description": "Drag and drop data (TestCaseBulkDragAndDropDto)",
            "properties": {
              "path": {
                "type": "array",
                "description": "Array of group IDs representing the target path",
                "items": {
                  "type": "number"
                }
              },
              "selection": {
                "type": "object",
                "description": "Test case tree selection criteria (TestCaseTreeSelectionDto)",
                "properties": {
                  "projectId": {
                    "type": "number",
                    "description": "Project ID (required)"
                  },
                  "treeId": {
                    "type": "number",
                    "description": "Tree ID"
                  },
                  "filterId": {
                    "type": "number",
                    "description": "Filter ID"
                  },
                  "search": {
                    "type": "string",
                    "description": "Search query"
                  },
                  "path": {
                    "type": "array",
                    "description": "Path array",
                    "items": {
                      "type": "number"
                    }
                  },
                  "deleted": {
                    "type": "boolean",
                    "description": "Include deleted test cases"
                  },
                  "inverted": {
                    "type": "boolean",
                    "description": "Invert selection"
                  },
                  "leafsInclude": {
                    "type": "array",
                    "description": "Leaf IDs to include",
                    "items": {
                      "type": "number"
                    }
                  },
                  "leafsExclude": {
                    "type": "array",
                    "description": "Leaf IDs to exclude",
                    "items": {
                      "type": "number"
                    }
                  },
                  "groupsInclude": {
                    "type": "array",
                    "description": "Group path arrays to include",
                    "items": {
                      "type": "array",
                      "items": {
                        "type": "number"
                      }
                    }
                  },
                  "groupsExclude": {
                    "type": "array",
                    "description": "Group path arrays to exclude",
                    "items": {
                      "type": "array",
                      "items": {
                        "type": "number"
                      }
                    }
                  }
                },
                "required": ["projectId"]
              }
            },
            "required": ["path", "selection"]
          }
        },
        "required": [
          "body"
        ]
      }
    },
    {
      "name": "allure_externalLinkAdd_1",
      "description": "Add external link for all test cases",
      "inputSchema": {
        "type": "object",
        "properties": {
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "body"
        ]
      }
    },
    {
      "name": "allure_issueAdd_1",
      "description": "Add issues for all test cases",
      "inputSchema": {
        "type": "object",
        "properties": {
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "body"
        ]
      }
    },
    {
      "name": "allure_issueRemove_1",
      "description": "Remove issues for all test cases",
      "inputSchema": {
        "type": "object",
        "properties": {
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "body"
        ]
      }
    },
    {
      "name": "allure_layerSet_1",
      "description": "Set specified layer for all test cases",
      "inputSchema": {
        "type": "object",
        "properties": {
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "body"
        ]
      }
    },
    {
      "name": "allure_memberAdd_1",
      "description": "Add members for all test cases",
      "inputSchema": {
        "type": "object",
        "properties": {
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "body"
        ]
      }
    },
    {
      "name": "allure_memberRemove_1",
      "description": "Remove member for all test cases",
      "inputSchema": {
        "type": "object",
        "properties": {
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "body"
        ]
      }
    },
    {
      "name": "allure_moveAll_1",
      "description": "Move test cases to other project",
      "inputSchema": {
        "type": "object",
        "properties": {
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "body"
        ]
      }
    },
    {
      "name": "allure_muteAdd_1",
      "description": "Add mute for all test cases",
      "inputSchema": {
        "type": "object",
        "properties": {
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "body"
        ]
      }
    },
    {
      "name": "allure_deleteAll_1",
      "description": "Remove test cases by ids",
      "inputSchema": {
        "type": "object",
        "properties": {
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "body"
        ]
      }
    },
    {
      "name": "allure_run_4",
      "description": "Run selected test cases in a new launch",
      "inputSchema": {
        "type": "object",
        "properties": {
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "body"
        ]
      }
    },
    {
      "name": "allure_run_6",
      "description": "Run selected test cases in an existing launch",
      "inputSchema": {
        "type": "object",
        "properties": {
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "body"
        ]
      }
    },
    {
      "name": "allure_run_5",
      "description": "Run selected test cases in a new launch",
      "inputSchema": {
        "type": "object",
        "properties": {
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "body"
        ]
      }
    },
    {
      "name": "allure_statusSet_1",
      "description": "Set specified status for all test cases",
      "inputSchema": {
        "type": "object",
        "properties": {
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "body"
        ]
      }
    },
    {
      "name": "allure_tagsAdd_2",
      "description": "Add tags for all test cases",
      "inputSchema": {
        "type": "object",
        "properties": {
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "body"
        ]
      }
    },
    {
      "name": "allure_tagsRemove_2",
      "description": "Remove tags for all test cases",
      "inputSchema": {
        "type": "object",
        "properties": {
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "body"
        ]
      }
    },
    {
      "name": "allure_createTestPlan_1",
      "description": "Create test plan from selected test cases",
      "inputSchema": {
        "type": "object",
        "properties": {
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "body"
        ]
      }
    }
  ];

export async function handleTestCaseBulkControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_cfvAdd_1': {
        const { body } = args;
        const result = await client.post(`/api/testcase/bulk/cfv/add`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_cfvRemove_1': {
        const { body } = args;
        const result = await client.post(`/api/testcase/bulk/cfv/remove`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_cloneAll_1': {
        const { body } = args;
        const result = await client.post(`/api/testcase/bulk/clone`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_dragAndDrop_1': {
        const { body } = args;
        const result = await client.post(`/api/testcase/bulk/draganddrop`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_externalLinkAdd_1': {
        const { body } = args;
        const result = await client.post(`/api/testcase/bulk/externallink/add`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_issueAdd_1': {
        const { body } = args;
        const result = await client.post(`/api/testcase/bulk/issue/add`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_issueRemove_1': {
        const { body } = args;
        const result = await client.post(`/api/testcase/bulk/issue/remove`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_layerSet_1': {
        const { body } = args;
        const result = await client.post(`/api/testcase/bulk/layer/set`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_memberAdd_1': {
        const { body } = args;
        const result = await client.post(`/api/testcase/bulk/member/add`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_memberRemove_1': {
        const { body } = args;
        const result = await client.post(`/api/testcase/bulk/member/remove`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_moveAll_1': {
        const { body } = args;
        const result = await client.post(`/api/testcase/bulk/move`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_muteAdd_1': {
        const { body } = args;
        const result = await client.post(`/api/testcase/bulk/mute/add`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_deleteAll_1': {
        const { body } = args;
        const result = await client.post(`/api/testcase/bulk/remove`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_run_4': {
        const { body } = args;
        const result = await client.post(`/api/testcase/bulk/run`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_run_6': {
        const { body } = args;
        const result = await client.post(`/api/testcase/bulk/run/existing`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_run_5': {
        const { body } = args;
        const result = await client.post(`/api/testcase/bulk/run/new`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_statusSet_1': {
        const { body } = args;
        const result = await client.post(`/api/testcase/bulk/status/set`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_tagsAdd_2': {
        const { body } = args;
        const result = await client.post(`/api/testcase/bulk/tag/add`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_tagsRemove_2': {
        const { body } = args;
        const result = await client.post(`/api/testcase/bulk/tag/remove`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_createTestPlan_1': {
        const { body } = args;
        const result = await client.post(`/api/testcase/bulk/testplan/create`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`TestCaseBulkController operation failed: ${error.message}`);
  }
}

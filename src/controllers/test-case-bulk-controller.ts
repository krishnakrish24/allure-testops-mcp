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
            "description": "TestCaseBulkNewCfvDto",
            "properties": {
              "cfv": {
                "type": "array",
                "description": "Array of custom fields with values (minItems: 1)",
                "minItems": 1,
                "items": {
                  "type": "object",
                  "properties": {
                    "id": { "type": "number", "description": "Custom field ID" },
                    "values": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": { "type": "number" }
                        }
                      }
                    }
                  }
                }
              },
              "selection": {
                "type": "object",
                "description": "Test case selection (TestCaseTreeSelectionDto)",
                "properties": {
                  "projectId": { "type": "number", "description": "Project ID (required)" }
                },
                "required": ["projectId"]
              }
            },
            "required": ["cfv", "selection"]
          }
        },
        "required": ["body"]
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
            "description": "TestCaseBulkEntityIdsDto",
            "properties": {
              "ids": {
                "type": "array",
                "description": "Array of custom field value IDs to remove (minItems: 1)",
                "minItems": 1,
                "items": { "type": "number" }
              },
              "selection": {
                "type": "object",
                "description": "Test case selection (TestCaseTreeSelectionDto)",
                "properties": {
                  "projectId": { "type": "number", "description": "Project ID (required)" }
                },
                "required": ["projectId"]
              }
            },
            "required": ["ids", "selection"]
          }
        },
        "required": ["body"]
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
            "description": "TestCaseBulkCloneDto",
            "properties": {
              "selection": {
                "type": "object",
                "description": "Test case selection (TestCaseTreeSelectionDto)",
                "properties": {
                  "projectId": { "type": "number", "description": "Project ID (required)" }
                },
                "required": ["projectId"]
              },
              "toProjectId": { "type": "number", "description": "Target project ID" },
              "nameSuffix": { "type": "string", "description": "Suffix to add to cloned test case names" },
              "ignoreAttachments": { "type": "boolean" },
              "ignoreCfv": { "type": "boolean" },
              "ignoreIssueLinks": { "type": "boolean" },
              "ignoreLinks": { "type": "boolean" },
              "ignoreMembers": { "type": "boolean" },
              "ignoreParameters": { "type": "boolean" },
              "ignoreRelations": { "type": "boolean" },
              "ignoreScenario": { "type": "boolean" },
              "ignoreTags": { "type": "boolean" },
              "ignoreTestKeys": { "type": "boolean" }
            },
            "required": ["selection"]
          }
        },
        "required": ["body"]
      }
    },
    {
      "name": "allure_dragAndDrop_1",
      "description": "dragAndDrop test cases for trees. IMPORTANT: 'path' must be an array of numeric group IDs (e.g., [1, 2, 3]), NOT string names.",
      "inputSchema": {
        "type": "object",
        "properties": {
          "body": {
            "type": "object",
            "description": "Drag and drop data (TestCaseBulkDragAndDropDto)",
            "properties": {
              "path": {
                "type": "array",
                "description": "Array of NUMERIC group IDs (Long/int64) representing the target path. Example: [100, 200]. DO NOT use string names like 'Connectivity' - you must use the numeric group IDs.",
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
            "description": "TestCaseBulkExternalLinkDto",
            "properties": {
              "links": {
                "type": "array",
                "description": "Array of external links (minItems: 1)",
                "minItems": 1,
                "items": {
                  "type": "object",
                  "properties": {
                    "name": { "type": "string" },
                    "url": { "type": "string" }
                  }
                }
              },
              "selection": {
                "type": "object",
                "description": "Test case selection (TestCaseTreeSelectionDto)",
                "properties": {
                  "projectId": { "type": "number", "description": "Project ID (required)" }
                },
                "required": ["projectId"]
              }
            },
            "required": ["links", "selection"]
          }
        },
        "required": ["body"]
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
            "description": "TestCaseBulkIssueDto",
            "properties": {
              "issues": {
                "type": "array",
                "description": "Array of issues (minItems: 1)",
                "minItems": 1,
                "items": {
                  "type": "object",
                  "properties": {
                    "id": { "type": "number", "description": "Issue ID" }
                  }
                }
              },
              "selection": {
                "type": "object",
                "description": "Test case selection (TestCaseTreeSelectionDto)",
                "properties": {
                  "projectId": { "type": "number", "description": "Project ID (required)" }
                },
                "required": ["projectId"]
              }
            },
            "required": ["issues", "selection"]
          }
        },
        "required": ["body"]
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
            "description": "TestCaseBulkEntityIdsDto",
            "properties": {
              "ids": {
                "type": "array",
                "description": "Array of issue IDs to remove (minItems: 1)",
                "minItems": 1,
                "items": { "type": "number" }
              },
              "selection": {
                "type": "object",
                "description": "Test case selection (TestCaseTreeSelectionDto)",
                "properties": {
                  "projectId": { "type": "number", "description": "Project ID (required)" }
                },
                "required": ["projectId"]
              }
            },
            "required": ["ids", "selection"]
          }
        },
        "required": ["body"]
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
            "description": "TestCaseBulkLayerDto",
            "properties": {
              "layerId": { "type": "number", "description": "Layer ID to set" },
              "selection": {
                "type": "object",
                "description": "Test case selection (TestCaseTreeSelectionDto)",
                "properties": {
                  "projectId": { "type": "number", "description": "Project ID (required)" }
                },
                "required": ["projectId"]
              }
            },
            "required": ["selection"]
          }
        },
        "required": ["body"]
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
            "description": "TestCaseBulkMemberDto",
            "properties": {
              "members": {
                "type": "array",
                "description": "Array of members (minItems: 1)",
                "minItems": 1,
                "items": {
                  "type": "object",
                  "properties": {
                    "userId": { "type": "number" },
                    "roleId": { "type": "number" }
                  }
                }
              },
              "selection": {
                "type": "object",
                "description": "Test case selection (TestCaseTreeSelectionDto)",
                "properties": {
                  "projectId": { "type": "number", "description": "Project ID (required)" }
                },
                "required": ["projectId"]
              }
            },
            "required": ["members", "selection"]
          }
        },
        "required": ["body"]
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
            "description": "TestCaseBulkEntityIdsDto",
            "properties": {
              "ids": {
                "type": "array",
                "description": "Array of member IDs to remove (minItems: 1)",
                "minItems": 1,
                "items": { "type": "number" }
              },
              "selection": {
                "type": "object",
                "description": "Test case selection (TestCaseTreeSelectionDto)",
                "properties": {
                  "projectId": { "type": "number", "description": "Project ID (required)" }
                },
                "required": ["projectId"]
              }
            },
            "required": ["ids", "selection"]
          }
        },
        "required": ["body"]
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
            "description": "TestCaseBulkProjectChangeDto",
            "properties": {
              "selection": {
                "type": "object",
                "description": "Test case selection (TestCaseTreeSelectionDto)",
                "properties": {
                  "projectId": { "type": "number", "description": "Project ID (required)" }
                },
                "required": ["projectId"]
              },
              "toProjectId": { "type": "number", "description": "Target project ID" },
              "cfMapping": {
                "type": "object",
                "description": "Custom field mapping (sourceFieldId -> targetFieldId)"
              }
            },
            "required": ["selection", "toProjectId"]
          }
        },
        "required": ["body"]
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
            "description": "TestCaseBulkMuteDto",
            "properties": {
              "mute": {
                "type": "object",
                "description": "Mute configuration",
                "properties": {
                  "reason": { "type": "string" },
                  "until": { "type": "string", "description": "ISO date string" }
                }
              },
              "selection": {
                "type": "object",
                "description": "Test case selection (TestCaseTreeSelectionDto)",
                "properties": {
                  "projectId": { "type": "number", "description": "Project ID (required)" }
                },
                "required": ["projectId"]
              }
            },
            "required": ["mute", "selection"]
          }
        },
        "required": ["body"]
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
            "description": "TestCaseBulkDto",
            "properties": {
              "selection": {
                "type": "object",
                "description": "Test case selection (TestCaseTreeSelectionDto)",
                "properties": {
                  "projectId": { "type": "number", "description": "Project ID (required)" }
                },
                "required": ["projectId"]
              }
            },
            "required": ["selection"]
          }
        },
        "required": ["body"]
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
            "description": "TestCaseBulkRunDto",
            "properties": {
              "selection": {
                "type": "object",
                "description": "Test case selection (TestCaseTreeSelectionDto)",
                "properties": {
                  "projectId": { "type": "number", "description": "Project ID (required)" }
                },
                "required": ["projectId"]
              }
            },
            "required": ["selection"]
          }
        },
        "required": ["body"]
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
            "description": "TestCaseBulkRunExistingLaunchDto",
            "properties": {
              "launchId": { "type": "number", "description": "Existing launch ID" },
              "selection": {
                "type": "object",
                "description": "Test case selection (TestCaseTreeSelectionDto)",
                "properties": {
                  "projectId": { "type": "number", "description": "Project ID (required)" }
                },
                "required": ["projectId"]
              },
              "assignees": {
                "type": "array",
                "items": { "type": "string" }
              },
              "envVarValueSets": {
                "type": "array"
              },
              "jobsMapping": {
                "type": "array"
              },
              "jobsParams": {
                "type": "array"
              }
            },
            "required": ["launchId", "selection"]
          }
        },
        "required": ["body"]
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
            "description": "TestCaseBulkRunNewLaunchDto",
            "properties": {
              "launchName": { 
                "type": "string", 
                "description": "Name for the new launch",
                "minLength": 1,
                "maxLength": 255
              },
              "selection": {
                "type": "object",
                "description": "Test case selection (TestCaseTreeSelectionDto)",
                "properties": {
                  "projectId": { "type": "number", "description": "Project ID (required)" }
                },
                "required": ["projectId"]
              },
              "assignees": {
                "type": "array",
                "items": { "type": "string" }
              },
              "issues": {
                "type": "array"
              },
              "links": {
                "type": "array"
              },
              "tags": {
                "type": "array"
              },
              "envVarValueSets": {
                "type": "array"
              },
              "jobsMapping": {
                "type": "array"
              },
              "jobsParams": {
                "type": "array"
              }
            },
            "required": ["launchName", "selection"]
          }
        },
        "required": ["body"]
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
            "description": "TestCaseBulkStatusDto",
            "properties": {
              "statusId": { "type": "number", "description": "Status ID" },
              "workflowId": { "type": "number", "description": "Workflow ID" },
              "selection": {
                "type": "object",
                "description": "Test case selection (TestCaseTreeSelectionDto)",
                "properties": {
                  "projectId": { "type": "number", "description": "Project ID (required)" }
                },
                "required": ["projectId"]
              }
            },
            "required": ["selection", "statusId", "workflowId"]
          }
        },
        "required": ["body"]
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
            "description": "TestCaseBulkTagDto",
            "properties": {
              "tags": {
                "type": "array",
                "description": "Array of tags (minItems: 1)",
                "minItems": 1,
                "items": {
                  "type": "object",
                  "properties": {
                    "name": { "type": "string" }
                  }
                }
              },
              "selection": {
                "type": "object",
                "description": "Test case selection (TestCaseTreeSelectionDto)",
                "properties": {
                  "projectId": { "type": "number", "description": "Project ID (required)" }
                },
                "required": ["projectId"]
              }
            },
            "required": ["selection", "tags"]
          }
        },
        "required": ["body"]
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
            "description": "TestCaseBulkTagDto",
            "properties": {
              "tags": {
                "type": "array",
                "description": "Array of tags (minItems: 1)",
                "minItems": 1,
                "items": {
                  "type": "object",
                  "properties": {
                    "name": { "type": "string" }
                  }
                }
              },
              "selection": {
                "type": "object",
                "description": "Test case selection (TestCaseTreeSelectionDto)",
                "properties": {
                  "projectId": { "type": "number", "description": "Project ID (required)" }
                },
                "required": ["projectId"]
              }
            },
            "required": ["selection", "tags"]
          }
        },
        "required": ["body"]
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
            "description": "TestCaseBulkTestPlanCreateDto",
            "properties": {
              "testPlanName": { 
                "type": "string",
                "description": "Name for the test plan",
                "minLength": 1,
                "maxLength": 255
              },
              "selection": {
                "type": "object",
                "description": "Test case selection (TestCaseTreeSelectionDto)",
                "properties": {
                  "projectId": { "type": "number", "description": "Project ID (required)" }
                },
                "required": ["projectId"]
              },
              "tree": {
                "type": "object",
                "description": "Tree reference",
                "properties": {
                  "id": { "type": "number" },
                  "name": { "type": "string" }
                }
              }
            },
            "required": ["selection", "testPlanName"]
          }
        },
        "required": ["body"]
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

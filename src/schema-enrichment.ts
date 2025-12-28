/**
 * Schema Enrichment Utility
 * 
 * Enhances tool inputSchemas with detailed property information from OpenAPI spec
 * This improves LLM understanding of what parameters are expected for each tool
 * 
 * Instead of generic "body" parameters, LLMs see the actual required fields,
 * types, and descriptions
 */

/**
 * Maps tool names to their enriched input schemas
 * Based on the OpenAPI specification
 */
export const schemaEnrichment: Record<string, Record<string, any>> = {
  // ============ LAUNCH CONTROLLER ============
  'allure_create_32': {
    body: {
      type: 'object',
      description: 'Launch creation request',
      properties: {
        name: {
          type: 'string',
          description: 'Launch name (required)'
        },
        projectId: {
          type: 'integer',
          format: 'int64',
          description: 'Project ID (required)'
        },
        autoclose: {
          type: 'boolean',
          description: 'Whether to autoclose the launch when all tests complete (optional)'
        },
        external: {
          type: 'boolean',
          description: 'Whether the launch is external (optional)'
        },
        tags: {
          type: 'array',
          description: 'Launch tags for categorization (optional)',
          items: {
            type: 'object',
            properties: {
              name: { 
                type: 'string',
                description: 'Tag name (required for each tag)'
              },
              id: { 
                type: 'integer',
                format: 'int64',
                description: 'Tag ID (optional, for referencing existing tags)'
              }
            },
            required: ['name']
          }
        },
        links: {
          type: 'array',
          description: 'External links (optional)',
          items: {
            type: 'object',
            properties: {
              name: { 
                type: 'string',
                description: 'Link name/title'
              },
              url: { 
                type: 'string',
                description: 'Link URL'
              },
              type: { 
                type: 'string',
                description: 'Link type (e.g., "link", "issue")'
              }
            }
          }
        },
        issues: {
          type: 'array',
          description: 'Associated issues (optional)',
          items: {
            type: 'object',
            properties: {
              name: { 
                type: 'string',
                description: 'Issue name'
              },
              url: { 
                type: 'string',
                description: 'Issue URL'
              },
              integrationId: { 
                type: 'integer',
                format: 'int64',
                description: 'Integration ID for issue tracking system'
              }
            }
          }
        }
      },
      required: ['name', 'projectId']
    }
  },
  
  'allure_merge': {
    body: {
      type: 'object',
      description: 'Launch merge request - combines multiple launches into one',
      properties: {
        launchIds: {
          type: 'array',
          items: { type: 'integer', format: 'int64' },
          description: 'IDs of launches to merge (required, minimum 2)'
        },
        name: {
          type: 'string',
          description: 'Name for the merged launch (required)'
        }
      },
      required: ['launchIds', 'name']
    }
  },
  
  'allure_create_34': {
    body: {
      type: 'object',
      description: 'Create a new launch via event',
      properties: {
        name: {
          type: 'string',
          description: 'Launch name (required)'
        },
        projectId: {
          type: 'integer',
          format: 'int64',
          description: 'Project ID (required)'
        },
        autoclose: {
          type: 'boolean',
          description: 'Whether to autoclose the launch (optional)'
        },
        external: {
          type: 'boolean',
          description: 'Whether the launch is external (optional)'
        },
        tags: {
          type: 'array',
          description: 'Launch tags (optional)',
          items: {
            type: 'object',
            properties: {
              name: { 
                type: 'string',
                description: 'Tag name'
              },
              id: { 
                type: 'integer',
                format: 'int64',
                description: 'Tag ID (optional)'
              }
            },
            required: ['name']
          }
        },
        links: {
          type: 'array',
          description: 'External links (optional)',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              url: { type: 'string' },
              type: { type: 'string' }
            }
          }
        }
      },
      required: ['name', 'projectId']
    }
  },

  // ============ TEST RESULT CONTROLLER ============
  'allure_create_73': {
    body: {
      type: 'object',
      description: 'Test result creation request',
      properties: {
        launchId: {
          type: 'integer',
          format: 'int64',
          description: 'Launch ID (required)'
        },
        name: {
          type: 'string',
          description: 'Test result name (required)'
        },
        status: {
          type: 'string',
          enum: ['PASSED', 'FAILED', 'SKIPPED', 'STOPPED', 'INTERRUPTED'],
          description: 'Test status (required)'
        },
        description: {
          type: 'string',
          description: 'Test description (optional)'
        },
        startTime: {
          type: 'integer',
          format: 'int64',
          description: 'Start time in milliseconds (optional)'
        },
        endTime: {
          type: 'integer',
          format: 'int64',
          description: 'End time in milliseconds (optional)'
        }
      },
      required: ['launchId', 'name', 'status']
    }
  },

  // ============ TEST CASE CONTROLLER ============
  'allure_create_5': {
    body: {
      type: 'object',
      description: 'Test case creation request',
      properties: {
        projectId: {
          type: 'integer',
          format: 'int64',
          description: 'Project ID (required)'
        },
        name: {
          type: 'string',
          description: 'Test case name (required)'
        },
        description: {
          type: 'string',
          description: 'Test case description (optional)'
        },
        status: {
          type: 'string',
          enum: ['DRAFT', 'READY', 'ARCHIVED'],
          description: 'Test case status (optional)'
        }
      },
      required: ['projectId', 'name']
    }
  },

  // ============ TEST RESULT CONTROLLER (V2) ============
  'create_6': {
    body: {
      type: 'object',
      description: 'Test result creation request (V2)',
      properties: {
        launchId: {
          type: 'integer',
          format: 'int64',
          description: 'Launch ID (required)'
        },
        name: {
          type: 'string',
          description: 'Test result name (required)'
        },
        status: {
          type: 'string',
          enum: ['PASSED', 'FAILED', 'SKIPPED', 'STOPPED', 'INTERRUPTED'],
          description: 'Test status (required)'
        },
        fullName: {
          type: 'string',
          description: 'Full test name including class/module path (optional)'
        },
        testCaseId: {
          type: 'integer',
          format: 'int64',
          description: 'Test case ID to link with this result (optional)'
        },
        testLayerId: {
          type: 'integer',
          format: 'int64',
          description: 'Test layer ID for grouping (optional)'
        },
        description: {
          type: 'string',
          description: 'Test description (optional)'
        },
        expectedResult: {
          type: 'string',
          description: 'Expected result (optional)'
        },
        precondition: {
          type: 'string',
          description: 'Precondition (optional)'
        },
        message: {
          type: 'string',
          description: 'Test result message/failure reason (optional)'
        },
        trace: {
          type: 'string',
          description: 'Stack trace for failures (optional)'
        },
        start: {
          type: 'integer',
          format: 'int64',
          description: 'Start time in milliseconds (optional)'
        },
        stop: {
          type: 'integer',
          format: 'int64',
          description: 'Stop time in milliseconds (optional)'
        },
        duration: {
          type: 'integer',
          format: 'int64',
          description: 'Duration in milliseconds (optional)'
        },
        manual: {
          type: 'boolean',
          description: 'Whether this is a manual test (optional)'
        },
        external: {
          type: 'boolean',
          description: 'Whether this is external test result (optional)'
        },
        tags: {
          type: 'array',
          description: 'Test tags for categorization (optional)',
          items: {
            type: 'object',
            properties: {
              name: { 
                type: 'string',
                description: 'Tag name'
              },
              id: { 
                type: 'integer',
                format: 'int64',
                description: 'Tag ID'
              }
            }
          }
        },
        links: {
          type: 'array',
          description: 'External links (optional)',
          items: {
            type: 'object',
            properties: {
              name: { 
                type: 'string',
                description: 'Link title'
              },
              url: { 
                type: 'string',
                description: 'Link URL'
              },
              type: { 
                type: 'string',
                description: 'Link type'
              }
            }
          }
        },
        members: {
          type: 'array',
          description: 'Test assignees/members (optional)',
          items: {
            type: 'object',
            properties: {
              name: { 
                type: 'string',
                description: 'Member name/login'
              }
            }
          }
        },
        customFields: {
          type: 'array',
          description: 'Custom field values (optional)',
          items: {
            type: 'object',
            properties: {
              id: { 
                type: 'integer',
                format: 'int64',
                description: 'Custom field ID'
              },
              value: { 
                type: 'string',
                description: 'Custom field value'
              }
            }
          }
        },
        scenario: {
          type: 'object',
          description: 'Test scenario (BDD) details (optional)',
          properties: {
            steps: {
              type: 'array',
              description: 'Scenario steps',
              items: {
                type: 'object',
                properties: {
                  keyword: { type: 'string' },
                  name: { type: 'string' },
                  status: { type: 'string' }
                }
              }
            }
          }
        }
      },
      required: ['launchId', 'name', 'status']
    }
  },

  // Add more tool enrichments here as needed
  // Follow the pattern: 'operationId': { propertyName: propertySchema, ... }
};

/**
 * Enhances a tool's inputSchema with detailed property information
 * 
 * @param tool - The tool to enrich
 * @returns The enriched tool with better schema information for LLMs
 */
export function enrichToolSchema(tool: any): any {
  const enrichment = schemaEnrichment[tool.name];
  if (!enrichment) {
    return tool;
  }

  // If tool has a generic 'body' parameter, replace it with detailed schema
  if (tool.inputSchema?.properties?.body && enrichment.body) {
    return {
      ...tool,
      inputSchema: {
        type: 'object',
        properties: enrichment,
        required: ['body']
      }
    };
  }

  return tool;
}

/**
 * Enriches all tools in an array with better schema information
 * 
 * @param tools - Array of tools to enrich
 * @returns Array of enriched tools
 */
export function enrichAllToolSchemas(tools: any[]): any[] {
  return tools.map(enrichToolSchema);
}

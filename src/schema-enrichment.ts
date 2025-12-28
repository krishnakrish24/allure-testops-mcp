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
          description: 'Launch tags for filtering and organization (optional)',
          items: {
            type: 'object',
            properties: {
              name: { 
                type: 'string',
                description: 'Tag name'
              },
              value: { 
                type: 'string',
                description: 'Tag value'
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

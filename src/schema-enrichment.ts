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
          enum: ['passed', 'failed', 'skipped', 'broken', 'unknown'],
          description: 'Test status (required) - must be lowercase: passed, failed, skipped, broken, or unknown'
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

  'allure_create_14': {
    body: {
      type: 'object',
      description: 'Test case creation request (V2) with comprehensive scenario and metadata support',
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
        fullName: {
          type: 'string',
          description: 'Full test name including class/module path (optional)'
        },
        description: {
          type: 'string',
          description: 'Test case description (optional)'
        },
        precondition: {
          type: 'string',
          description: 'Precondition/setup steps (optional)'
        },
        expectedResult: {
          type: 'string',
          description: 'Expected result/outcome (optional)'
        },
        automated: {
          type: 'boolean',
          description: 'Whether this is an automated test (optional)'
        },
        external: {
          type: 'boolean',
          description: 'Whether this is an external test (optional)'
        },
        deleted: {
          type: 'boolean',
          description: 'Whether this test case is deleted (optional)'
        },
        testLayerId: {
          type: 'integer',
          format: 'int64',
          description: 'Test layer ID for categorization (optional)'
        },
        statusId: {
          type: 'integer',
          format: 'int64',
          description: 'Custom status ID from workflow (optional)'
        },
        workflowId: {
          type: 'integer',
          format: 'int64',
          description: 'Workflow ID for status management (optional)'
        },
        tags: {
          type: 'array',
          description: 'Test tags for categorization (optional)',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                format: 'int64',
                description: 'Tag ID'
              },
              name: {
                type: 'string',
                description: 'Tag name'
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
                description: 'Link title'
              },
              url: {
                type: 'string',
                description: 'Link URL'
              },
              type: {
                type: 'string',
                description: 'Link type (e.g., "link", "issue")'
              }
            },
            required: ['url']
          }
        },
        members: {
          type: 'array',
          description: 'Test assignees/members (optional)',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                format: 'int64',
                description: 'Member ID'
              },
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
              name: {
                type: 'string',
                description: 'Custom field name'
              }
            }
          }
        },
        scenario: {
          type: 'object',
          description: 'Test scenario (BDD) details with step definitions (optional)',
          properties: {
            steps: {
              type: 'array',
              description: 'Scenario steps (each step can be BodyStepDto, AttachmentStepDto, ExpectedBodyStepDto, or SharedStepStepDto)',
              items: {
                type: 'object',
                description: 'Scenario step - typically a BodyStepDto with type, name, and optional body content',
                properties: {
                  type: {
                    type: 'string',
                    enum: ['body', 'attachment', 'expectedBody', 'sharedStep'],
                    description: 'Step type - body (regular step), attachment (with file), expectedBody (with expected outcome), or sharedStep (reference to shared step)'
                  },
                  name: {
                    type: 'string',
                    description: 'Step name/title (required)'
                  },
                  body: {
                    type: 'string',
                    description: 'Step body/content - HTML or plain text describing the step (optional, for body and expectedBody steps)'
                  }
                },
                required: ['type', 'name']
              }
            }
          }
        }
      },
      required: ['projectId', 'name']
    }
  },

  // ============ TEST RESULT CONTROLLER (V2) ============
  'allure_create_6': {
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
          enum: ['passed', 'failed', 'skipped', 'broken', 'unknown'],
          description: 'Test status (required) - must be lowercase: passed, failed, skipped, broken, or unknown'
        },
        fullName: {
          type: 'string',
          description: 'Full test name including class/module path (optional)'
        },
        testCaseId: {
          type: 'integer',
          format: 'int64',
          description: 'Test case ID to link with this result. Generate a new ID if not available (required)'
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
          description: 'Test scenario (BDD) details - contains step-by-step execution trace (optional)',
          properties: {
            steps: {
              type: 'array',
              description: 'Scenario steps - each step MUST have type field and optional body/message content',
              items: {
                type: 'object',
                description: 'Scenario step - currently only body steps are supported (no id/name/content fields)',
                properties: {
                  type: {
                    type: 'string',
                    enum: ['body'],
                    description: 'Step type - MUST be "body" (attachment and expectedBody types not supported for creation)'
                  },
                  name: {
                    type: 'string',
                    description: 'Step name (required)'
                  },
                  body: {
                    type: 'string',
                    description: 'Step body/content - HTML or plain text describing the step execution (optional)'
                  },
                  message: {
                    type: 'string',
                    description: 'Step message/log line (optional)'
                  },
                  status: {
                    type: 'string',
                    enum: ['passed', 'failed', 'skipped', 'broken', 'unknown'],
                    description: 'Step execution status (optional) - must be lowercase: passed, failed, skipped, broken, or unknown'
                  },
                  start: {
                    type: 'integer',
                    format: 'int64',
                    description: 'Step start time in milliseconds (optional)'
                  },
                  stop: {
                    type: 'integer',
                    format: 'int64',
                    description: 'Step stop time in milliseconds (optional)'
                  },
                  duration: {
                    type: 'integer',
                    format: 'int64',
                    description: 'Step duration in milliseconds (optional)'
                  },
                  trace: {
                    type: 'string',
                    description: 'Step failure trace/error details (optional)'
                  },
                  parameters: {
                    type: 'array',
                    description: 'Step parameters/arguments (optional)',
                    items: {
                      type: 'object',
                      properties: {
                        name: { type: 'string' },
                        value: { type: 'string' },
                        excluded: { type: 'boolean' },
                        hidden: { type: 'boolean' }
                      }
                    }
                  }
                },
                required: ['type'],
                additionalProperties: false
              }
            }
          }
        }
      },
      required: ['launchId', 'name', 'status']
    }
  },

  // ============ UPLOAD CONTROLLER ============
  'allure_uploadResults': {
    id: {
      type: 'integer',
      format: 'int64',
      description: 'Launch ID to upload test results to (required)'
    },
    body: {
      type: 'object',
      description: 'Upload request containing test results in Allure JSON format',
      properties: {
        projectId: {
          type: 'integer',
          format: 'int64',
          description: 'Project ID for the upload (required)'
        },
        info: {
          type: 'object',
          description: 'Upload metadata',
          properties: {
            projectId: {
              type: 'integer',
              format: 'int64',
              description: 'Project ID (required)'
            }
          },
          required: ['projectId']
        }
      },
      additionalProperties: true
    }
  },

  'allure_uploadResultsArchives': {
    id: {
      type: 'integer',
      format: 'int64',
      description: 'Launch ID to upload test result archives to (required)'
    },
    body: {
      type: 'object',
      description: 'Upload request for compressed test result files (ZIP or TAR.GZ)',
      properties: {
        projectId: {
          type: 'integer',
          format: 'int64',
          description: 'Project ID for the upload (required)'
        },
        archivePath: {
          type: 'string',
          description: 'Path or URL to the archive file containing test results (required)'
        },
        archiveType: {
          type: 'string',
          enum: ['zip', 'tar.gz', 'tgz'],
          description: 'Type of archive file (optional, auto-detected if not specified)'
        }
      },
      additionalProperties: true
    }
  },

  'allure_uploadResultsFiles': {
    id: {
      type: 'integer',
      format: 'int64',
      description: 'Launch ID to upload test result files to (required)'
    },
    body: {
      type: 'object',
      description: 'Upload request for test result files',
      properties: {
        projectId: {
          type: 'integer',
          format: 'int64',
          description: 'Project ID for the upload (required)'
        },
        files: {
          type: 'array',
          description: 'Array of test result files in Allure JSON format (required)',
          items: {
            type: 'object',
            description: 'Single test result file',
            properties: {
              name: {
                type: 'string',
                description: 'Test name'
              },
              status: {
                type: 'string',
                enum: ['passed', 'failed', 'skipped', 'broken', 'unknown'],
                description: 'Test status (must be lowercase)'
              },
              start: {
                type: 'integer',
                format: 'int64',
                description: 'Start timestamp in milliseconds'
              },
              stop: {
                type: 'integer',
                format: 'int64',
                description: 'Stop timestamp in milliseconds'
              },
              description: {
                type: 'string',
                description: 'Test description (optional)'
              },
              fullName: {
                type: 'string',
                description: 'Full test name with class/module path (optional)'
              },
              steps: {
                type: 'array',
                description: 'Test steps (optional)',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    status: { type: 'string' },
                    start: { type: 'integer' },
                    stop: { type: 'integer' }
                  }
                }
              },
              labels: {
                type: 'array',
                description: 'Labels/tags for the test (optional)',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    value: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      },
      required: ['projectId', 'files']
    }
  },

  // ============ LAUNCH UPLOAD CONTROLLER ============
  'allure_upload_1': {
    info: {
      type: 'object',
      description: 'Launch creation metadata (LaunchCreateAndUploadDto) - sent as JSON file field with Content-Disposition header in multipart request (required)',
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
        tags: {
          type: 'array',
          description: 'Launch tags for categorization (optional)',
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
                description: 'Tag ID (optional, for existing tags)'
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
                description: 'Link type'
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
                description: 'Integration ID'
              }
            }
          }
        },
        envVarValues: {
          type: 'array',
          description: 'Environment variable values (optional)',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Variable name'
              },
              value: {
                type: 'string',
                description: 'Variable value'
              },
              id: {
                type: 'integer',
                format: 'int64',
                description: 'Variable ID'
              }
            }
          }
        }
      },
      required: ['name', 'projectId']
    },
    file: {
      type: 'string',
      description: 'Base64-encoded ZIP file containing test results in Allure JSON format (required)'
    }
  },

  'allure_upload': {
    launchId: {
      type: 'integer',
      format: 'int64',
      description: 'Launch ID to upload results to (required)'
    },
    info: {
      type: 'object',
      description: 'Upload metadata (LaunchExistingUploadDto) - sent as JSON file field with Content-Disposition header in multipart request (required)',
      properties: {
        projectId: {
          type: 'integer',
          format: 'int64',
          description: 'Project ID (required)'
        },
        envVarValues: {
          type: 'array',
          description: 'Environment variable values (optional)',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Variable name'
              },
              value: {
                type: 'string',
                description: 'Variable value'
              },
              id: {
                type: 'integer',
                format: 'int64',
                description: 'Variable ID'
              }
            }
          }
        }
      }
    },
    file: {
      type: 'string',
      description: 'Base64-encoded JSON file containing test results in Allure JSON format (required)'
    }
  },

  'allure_uploadArchives': {
    launchId: {
      type: 'integer',
      format: 'int64',
      description: 'Launch ID to upload archive to (required)'
    },
    info: {
      type: 'object',
      description: 'Upload metadata (LaunchExistingUploadDto) - sent as JSON file field with Content-Disposition header in multipart request (required)',
      properties: {
        projectId: {
          type: 'integer',
          format: 'int64',
          description: 'Project ID (required)'
        },
        envVarValues: {
          type: 'array',
          description: 'Environment variable values (optional)',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Variable name'
              },
              value: {
                type: 'string',
                description: 'Variable value'
              },
              id: {
                type: 'integer',
                format: 'int64',
                description: 'Variable ID'
              }
            }
          }
        }
      }
    },
    file: {
      type: 'string',
      description: 'Base64-encoded compressed archive file (ZIP or TAR.GZ) containing test results (required)'
    }
  },

  'allure_uploadFiles': {
    launchId: {
      type: 'integer',
      format: 'int64',
      description: 'Launch ID to upload files to (required)'
    },
    info: {
      type: 'object',
      description: 'Upload metadata (LaunchExistingUploadDto) - sent as JSON file field with Content-Disposition header in multipart request (required)',
      properties: {
        projectId: {
          type: 'integer',
          format: 'int64',
          description: 'Project ID (required)'
        },
        envVarValues: {
          type: 'array',
          description: 'Environment variable values (optional)',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Variable name'
              },
              value: {
                type: 'string',
                description: 'Variable value'
              },
              id: {
                type: 'integer',
                format: 'int64',
                description: 'Variable ID'
              }
            }
          }
        }
      }
    },
    file: {
      type: 'string',
      description: 'Base64-encoded file containing test results in Allure JSON format (required)'
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

  // If tool has 'info' and/or 'file' parameters (like launch upload tools), enrich with details
  if ((tool.inputSchema?.properties?.info || tool.inputSchema?.properties?.file) && (enrichment.info || enrichment.file)) {
    const currentRequired = tool.inputSchema?.required || [];
    return {
      ...tool,
      inputSchema: {
        type: 'object',
        properties: enrichment,
        required: currentRequired
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

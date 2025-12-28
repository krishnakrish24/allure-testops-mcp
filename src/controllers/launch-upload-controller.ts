/**
 * LaunchUploadController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const launchUploadControllerTools = [
    {
      "name": "allure_upload_1",
      "description": "Create a new launch and upload test results simultaneously. Sends multipart form data with info (launch metadata as JSON file) and file (test results ZIP).",
      "inputSchema": {
        "type": "object",
        "properties": {
          "info": {
            "type": "object",
            "description": "Launch creation metadata (LaunchCreateAndUploadDto) - sent as JSON file field in multipart request"
          },
          "file": {
            "type": "string",
            "description": "Base64-encoded ZIP file containing test results"
          }
        },
        "required": ["info", "file"]
      }
    },
    {
      "name": "allure_upload",
      "description": "Upload test results to an existing launch. Sends multipart form data with info (metadata as JSON file) and file (test results ZIP).",
      "inputSchema": {
        "type": "object",
        "properties": {
          "launchId": {
            "type": "integer",
            "format": "int64",
            "description": "Launch ID to upload results to"
          },
          "info": {
            "type": "object",
            "description": "Upload metadata (LaunchExistingUploadDto) - sent as JSON file field in multipart request"
          },
          "file": {
            "type": "string",
            "description": "Base64-encoded ZIP file containing test results"
          }
        },
        "required": ["launchId", "info", "file"]
      }
    },
    {
      "name": "allure_uploadArchives",
      "description": "Upload compressed archive containing test results to an existing launch. Supports ZIP or TAR.GZ formats. Sends multipart form data with info (metadata as JSON file) and file (compressed archive).",
      "inputSchema": {
        "type": "object",
        "properties": {
          "launchId": {
            "type": "integer",
            "format": "int64",
            "description": "Launch ID to upload archive to"
          },
          "info": {
            "type": "object",
            "description": "Upload metadata (LaunchExistingUploadDto) - sent as JSON file field in multipart request"
          },
          "file": {
            "type": "string",
            "description": "Base64-encoded compressed archive file (ZIP or TAR.GZ) containing test results"
          }
        },
        "required": ["launchId", "info", "file"]
      }
    },
    {
      "name": "allure_uploadFiles",
      "description": "Upload individual files containing test results to an existing launch. Sends multipart form data with info (metadata as JSON file) and file (test result file).",
      "inputSchema": {
        "type": "object",
        "properties": {
          "launchId": {
            "type": "integer",
            "format": "int64",
            "description": "Launch ID to upload files to"
          },
          "info": {
            "type": "object",
            "description": "Upload metadata (LaunchExistingUploadDto) - sent as JSON file field in multipart request"
          },
          "file": {
            "type": "string",
            "description": "Base64-encoded file containing test results"
          }
        },
        "required": ["launchId", "info", "file"]
      }
    }
  ];

export async function handleLaunchUploadControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_upload_1': {
        const { info, file } = args;
        if (!info || !file) {
          throw new Error('Both info and file parameters are required');
        }
        // Convert base64 file to buffer
        const fileBuffer = typeof file === 'string' && file.startsWith('data:')
          ? Buffer.from(file.split(',')[1], 'base64')
          : Buffer.from(file, 'base64');
        
        const result = await client.postMultipart(
          `/api/launch/upload`,
          info,
          fileBuffer,
          'results.zip'
        );
        return JSON.stringify(result, null, 2);
      }

      case 'allure_upload': {
        const { launchId, info, file } = args;
        if (!launchId || !info || !file) {
          throw new Error('launchId, info, and file parameters are all required');
        }
        // Convert base64 file to buffer
        const fileBuffer = typeof file === 'string' && file.startsWith('data:')
          ? Buffer.from(file.split(',')[1], 'base64')
          : Buffer.from(file, 'base64');
        
        const result = await client.postMultipart(
          `/api/launch/${launchId}/upload`,
          info,
          fileBuffer,
          'results.zip'
        );
        return JSON.stringify(result, null, 2);
      }

      case 'allure_uploadArchives': {
        const { launchId, info, file } = args;
        if (!launchId || !info || !file) {
          throw new Error('launchId, info, and file parameters are all required');
        }
        // Convert base64 file to buffer
        const fileBuffer = typeof file === 'string' && file.startsWith('data:')
          ? Buffer.from(file.split(',')[1], 'base64')
          : Buffer.from(file, 'base64');
        
        const result = await client.postMultipart(
          `/api/launch/${launchId}/upload/archive`,
          info,
          fileBuffer,
          'results.zip'
        );
        return JSON.stringify(result, null, 2);
      }

      case 'allure_uploadFiles': {
        const { launchId, info, file } = args;
        if (!launchId || !info || !file) {
          throw new Error('launchId, info, and file parameters are all required');
        }
        // Convert base64 file to buffer
        const fileBuffer = typeof file === 'string' && file.startsWith('data:')
          ? Buffer.from(file.split(',')[1], 'base64')
          : Buffer.from(file, 'base64');
        
        const result = await client.postMultipart(
          `/api/launch/${launchId}/upload/file`,
          info,
          fileBuffer,
          'results.zip'
        );
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`LaunchUploadController operation failed: ${error.message}`);
  }
}

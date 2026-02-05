/**
 * TestResultAttachmentController - MCP Tools
 * Handles test result attachments with multipart upload support
 */

import { AllureClient } from '../allure-client.js';

export const testResultAttachmentControllerTools = [
  {
    "name": "allure_findAll_6",
    "description": "Find all attachments for a given test result",
    "inputSchema": {
      "type": "object",
      "properties": {
        "testResultId": {
          "type": "integer",
          "format": "int64",
          "description": "Test result ID to get attachments for"
        },
        "page": {
          "type": "integer",
          "description": "Zero-based page index (0..N)",
          "default": 0,
          "minimum": 0
        },
        "size": {
          "type": "integer",
          "description": "The size of the page to be returned",
          "default": 10,
          "minimum": 1
        },
        "sort": {
          "type": "array",
          "description": "Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.",
          "items": {
            "type": "string"
          },
          "default": ["name,ASC"]
        }
      },
      "required": ["testResultId"]
    }
  },
  {
    "name": "allure_create_testresult_attachment",
    "description": "Upload attachment file(s) to a test result. Sends multipart form data with file(s). Supports multiple files in one request.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "testResultId": {
          "type": "integer",
          "format": "int64",
          "description": "Test result ID to attach files to"
        },
        "file": {
          "type": "string",
          "description": "Base64-encoded file content to upload as attachment"
        },
        "fileName": {
          "type": "string",
          "description": "Original filename for the attachment (optional, defaults to 'attachment')"
        }
      },
      "required": ["testResultId", "file"]
    }
  },
  {
    "name": "allure_delete_testresult_attachment",
    "description": "Delete a test result attachment by ID",
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64",
          "description": "Attachment ID to delete"
        }
      },
      "required": ["id"]
    }
  },
  {
    "name": "allure_get_testresult_attachment_content",
    "description": "Get the content of a test result attachment",
    "inputSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64",
          "description": "Attachment ID to retrieve content for"
        }
      },
      "required": ["id"]
    }
  }
];

export async function handleTestResultAttachmentControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAll_6': {
        const { testResultId, page, size, sort } = args;
        const queryParams = { testResultId, page, size, sort };
        const result = await client.get(`/api/testresult/attachment`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_testresult_attachment': {
        const { testResultId, file, fileName } = args;
        if (!testResultId || !file) {
          throw new Error('testResultId and file parameters are required');
        }

        // Convert base64 file to buffer
        const fileBuffer = typeof file === 'string' && file.startsWith('data:')
          ? Buffer.from(file.split(',')[1], 'base64')
          : Buffer.from(file, 'base64');

        const attachmentFileName = fileName || 'attachment';

        // Use the client's postSingleFile method for file-only upload
        const result = await client.postSingleFile(
          '/api/testresult/attachment',
          fileBuffer,
          attachmentFileName,
          { testResultId }
        );
        
        return JSON.stringify(result, null, 2);
      }

      case 'allure_delete_testresult_attachment': {
        const { id } = args;
        if (!id) {
          throw new Error('id parameter is required');
        }
        await client.delete(`/api/testresult/attachment/${id}`, {});
        return JSON.stringify({ success: true, message: 'Attachment deleted successfully' }, null, 2);
      }

      case 'allure_get_testresult_attachment_content': {
        const { id } = args;
        if (!id) {
          throw new Error('id parameter is required');
        }
        // Get binary content and convert to base64
        const binaryData = await client.getBinary(`/api/testresult/attachment/${id}/content`, {});
        const buffer = Buffer.from(binaryData);
        const base64Content = buffer.toString('base64');
        return JSON.stringify({ 
          id, 
          content: base64Content,
          size: buffer.length,
          encoding: 'base64'
        }, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    console.error(`Error in handleTestResultAttachmentControllerTool (${toolName}):`, error);
    throw new Error(`Tool execution failed: ${error.message}`);
  }
}

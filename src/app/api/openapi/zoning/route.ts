import { NextResponse } from 'next/server';

// Define the schema directly in this file
const schema = {
  "openapi": "3.1.0",
  "info": {
    "title": "Chicago Parcel and Zoning Lookup API",
    "description": "An API to retrieve parcel and zoning information for properties in Chicago.",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://capital-match-ai-platform.vercel.app/api",
      "description": "Production server"
    }
  ],
  "paths": {
    "/zoning": {
      "get": {
        "summary": "Retrieve parcel and zoning information for a given address",
        "operationId": "getZoningInfo",
        "tags": [
          "Zoning"
        ],
        "parameters": [
          {
            "name": "address",
            "in": "query",
            "description": "The property address to look up (should be in Chicago)",
            "required": true,
            "schema": {
              "type": "string",
              "example": "Willis Tower, Chicago"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response with parcel and zoning data",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "coordinates": {
                      "type": "object",
                      "properties": {
                        "lat": {
                          "type": "number",
                          "example": 41.8781
                        },
                        "lng": {
                          "type": "number",
                          "example": -87.6298
                        }
                      }
                    },
                    "zoning": {
                      "type": "object",
                      "properties": {
                        "zoning_classification": {
                          "type": "string",
                          "example": "B3-5"
                        },
                        "description": {
                          "type": "string",
                          "example": "Community Shopping District"
                        }
                      }
                    },
                    "parcel": {
                      "type": "object",
                      "properties": {
                        "pin": {
                          "type": "string",
                          "example": "17091230120000"
                        },
                        "property_class": {
                          "type": "string",
                          "example": "5-99"
                        },
                        "township_name": {
                          "type": "string",
                          "example": "CHICAGO"
                        },
                        "square_footage": {
                          "type": "number",
                          "example": 5000
                        }
                      }
                    },
                    "address_queried": {
                      "type": "string",
                      "example": "Willis Tower, Chicago"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request - missing required parameters",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string",
                      "example": "Address parameter is required"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export async function GET(request: Request) {
  // Add CORS headers
  const headers = new Headers();
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Methods', 'GET, OPTIONS');
  headers.append('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers });
  }
  
  // Return the schema as JSON with CORS headers
  return NextResponse.json(schema, { headers });
}
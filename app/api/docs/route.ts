/**
 * @file app/api/docs/route.ts
 * @description API route handler to expose the generated OpenAPI document.
 */

import { generateOpenApiDocument } from "@/lib/openapi";
import { NextResponse } from "next/server";

/**
 * Handles GET requests to provide the OpenAPI specification.
 * 
 * @returns {NextResponse} The JSON payload of the OpenAPI document.
 */
export function GET(): NextResponse {
  const document = generateOpenApiDocument();
  return NextResponse.json(document);
}
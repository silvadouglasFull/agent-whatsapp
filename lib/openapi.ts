/**
 * @file lib/openapi.ts
 * @description Centralizes Zod schemas and OpenAPI registry configuration.
 */

import { webhookPayloadSchema, webhookQuerySchema } from "@/app/api/webhook/schema";
import { extendZodWithOpenApi, OpenApiGeneratorV3, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

// Extend Zod to enable the .openapi() method on schemas
extendZodWithOpenApi(z);

export const registry = new OpenAPIRegistry();

// Registering the Webhook Verification Schema (GET)
export const WebhookQuerySchemaRef = registry.register(
    "WebhookVerificationQuery",
    webhookQuerySchema
);

// Registering the Webhook Payload Schema (POST)
export const WebhookPayloadSchemaRef = registry.register(
    "WebhookPayload",
    webhookPayloadSchema
);

// Registering the GET endpoint for Webhook verification
registry.registerPath({
    method: "get",
    path: "/webhook",
    summary: "Verify webhook subscription token",
    tags: ["WhatsApp Webhook"],
    request: {
        query: webhookQuerySchema,
    },
    responses: {
        200: {
            description: "Challenge string returned successfully",
            content: {
                "text/plain": {
                    schema: z.string(),
                },
            },
        },
        403: {
            description: "Forbidden - Token mismatch",
            content: {
                "text/plain": {
                    schema: z.string(),
                },
            },
        },
    },
});

// Registering the POST endpoint for incoming WhatsApp events
registry.registerPath({
    method: "post",
    path: "/webhook",
    summary: "Receive incoming WhatsApp messages and events",
    tags: ["WhatsApp Webhook"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: webhookPayloadSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Event successfully processed or received",
            content: {
                "text/plain": {
                    schema: z.string(),
                },
            },
        },
        404: {
            description: "Not Found - Invalid object type",
            content: {
                "text/plain": {
                    schema: z.string(),
                },
            },
        },
    },
});

/**
 * Generates the complete OpenAPI document object.
 * 
 * @returns {Record<string, any>} The OpenAPI specification JSON object.
 */
export function generateOpenApiDocument(): Record<string, any> {
    const generator = new OpenApiGeneratorV3(registry.definitions);

    return generator.generateDocument({
        openapi: "3.0.0",
        info: {
            title: "Agent WhatsApp API",
            version: "1.0.0",
            description: "Automated API documentation generated from Zod schemas",
        },
        servers: [{ url: "/api/v1" }],
    });
}
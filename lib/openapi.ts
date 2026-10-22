import { webhookPayloadSchema, webhookQuerySchema } from "@/app/api/webhook/schema";
import { extendZodWithOpenApi, OpenApiGeneratorV3, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { webhookRegisterPathGet, webhookRegisterPathPost } from "./webhook-register-path";

extendZodWithOpenApi(z);

export const registry = new OpenAPIRegistry();
export const WebhookQuerySchemaRef = registry.register(
    "WebhookVerificationQuery",
    webhookQuerySchema
);
export const WebhookPayloadSchemaRef = registry.register(
    "WebhookPayload",
    webhookPayloadSchema
);
registry.registerPath(webhookRegisterPathGet)
registry.registerPath(webhookRegisterPathPost)
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
        servers: [{ url: "/api" }],
    });
}
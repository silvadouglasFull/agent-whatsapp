import { webhookPayloadSchema, webhookQuerySchema } from "@/app/api/webhook/schema";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export const webhookRegisterPathGet: RouteConfig = {
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
    }
}
export const webhookRegisterPathPost: RouteConfig = {
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
}


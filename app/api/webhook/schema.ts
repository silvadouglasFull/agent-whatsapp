import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
extendZodWithOpenApi(z);
export const webhookQuerySchema = z.object({
    "hub.mode": z.string().openapi({ example: "subscribe", description: "Subscription mode" }),
    "hub.verify_token": z.string().openapi({ example: "seu_token_aqui", description: "Verification token configured in Meta dashboard" }),
    "hub.challenge": z.string().openapi({ example: "1158201444", description: "Challenge string sent by Meta" }),
});

export const webhookPayloadSchema = z.object({
    object: z.string().openapi({ example: "whatsapp_business_account" }),
    entry: z.array(
        z.object({
            id: z.string().openapi({ example: "123456789" }),
            changes: z.array(
                z.object({
                    value: z.object({
                        messaging_product: z.string().openapi({ example: "whatsapp" }),
                        metadata: z.object({
                            display_phone_number: z.string().openapi({ example: "5511999999999" }),
                            phone_number_id: z.string().openapi({ example: "123456" }),
                        }),
                        messages: z.array(
                            z.object({
                                from: z.string().openapi({ example: "5511888888888" }),
                                id: z.string().openapi({ example: "wamid.HBgL..." }),
                                timestamp: z.string().openapi({ example: "1625000000" }),
                                type: z.enum(["text", "location"]).openapi({ example: "text" }),
                                text: z.object({
                                    body: z.string().openapi({ example: "Olá, gostaria de saber mais informações!" }),
                                }).optional(),
                                location: z.object({
                                    latitude: z.number().openapi({ example: -23.55052 }),
                                    longitude: z.number().openapi({ example: -46.633308 }),
                                }).optional(),
                            })
                        ).optional(),
                    }),
                    field: z.string().openapi({ example: "messages" }),
                })
            ),
        })
    ),
});
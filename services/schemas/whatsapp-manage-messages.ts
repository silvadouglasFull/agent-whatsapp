/**
 * @file services/schemas/whatsapp-manager-messages.ts
 * @description Zod schemas for WhatsApp message sending requests and responses.
 */

import { z } from "zod";

/**
 * Schema to validate snake_case format strings.
 */
const nameSnakeCaseSchema = z.string().regex(
    /^[a-z0-9]+(_[a-z0-9]+)*$/,
    { message: "The string must be in snake_case format (e.g., hello_world)" }
);

/**
 * Schema to validate supported messaging channels.
 */
const messagingProductSchema = z.enum(["whatsapp", "messenger", "telegram", "sms"], {
    message: "Invalid channel. Choose from: whatsapp, messenger, telegram, sms"
}).default('whatsapp');

/**
 * Schema to validate language/locale codes.
 */
const languageCodeSchema = z.enum(["pt_BR", "en_US"], {
    message: "The locale code should be something like pt_BR or en_US"
}).optional().default('pt_BR');

/**
 * Schema to validate WhatsApp send message request payload.
 */
export const recipientPhoneNumber = z.string().regex(/^55\d{11}$/, { message: "Invalid phone number" })
export const whatsappSendMessageRequestSchema = z.object({
    whatsappBussinessPhoneNumberId: z.string(),
    messagingProduct: messagingProductSchema,
    recipientPhoneNumber: recipientPhoneNumber,
    type: z.string().optional().default('template'),
    template: z.object({
        name: nameSnakeCaseSchema,
        language: z.object({
            code: languageCodeSchema
        }),
        components: z.array(
            z.object({
                type: z.string(),
                parameters: z.array(z.object({ type: z.string(), text: z.string() }))
            })
        ).optional()
    }),
});

/**
 * Schema to validate WhatsApp API error responses.
 */
export const whatsAppErrorSchema = z.object({
    error: z.object({
        message: z.string(),
        type: z.string(),
        code: z.number(),
        error_data: z
            .object({
                messaging_product: messagingProductSchema,
                details: z.string()
            })
            .optional(),
        fbtrace_id: z.string()
    })
});

/**
 * Schema to validate successful WhatsApp API responses.
 */
export const whatsAppSuccessSchema = z.object({
    messaging_product: messagingProductSchema,
    contacts: z.array(
        z.object({
            input: z.string(),
            status: z.string().optional(),
            wa_id: z.string()
        })
    ),
    messages: z.array(
        z.object({
            id: z.string()
        })
    )
});

export const whatsappSendMessageResponseSchema = whatsAppSuccessSchema;

export const whatsappGetMessagesTemplateRequestSchema = z.object({
    whatsappBussinessPhoneNumberId: z.string()
})
export const bodyTextNamedParams = z.array(
    z.object({ param_name: z.string(), example: z.string() })
).optional()
export const whatsappGetMessagesTemplateResponseSchema = z.object({
    data: z.array(
        z.object({
            name: z.string(),
            parameter_format: z.string().optional(),
            sub_category: z.string().optional(),
            disable_ios_autofill: z.boolean().optional(),
            is_primary_device_delivery_only: z.boolean().optional(),
            components: z.array(
                z.object({
                    type: z.string(),
                    format: z.string().optional(),
                    text: z.string().optional(),
                    example: z.object({
                        header_handle: z.array(z.string()).optional(),
                        header_text: z.array(z.string()).optional(),
                        body_text: z.array(z.array(z.string())).optional(),
                        body_text_named_params: bodyTextNamedParams,
                    }).passthrough().optional(),
                    buttons: z.array(
                        z.object({
                            type: z.string(),
                            text: z.string().optional(),
                            url: z.string().optional(),
                            phone_number: z.string().optional()
                        }).passthrough()
                    ).optional()
                }).passthrough()
            ),
            language: z.string(),
            status: z.string(),
            category: z.string(),
            id: z.string()
        }).passthrough()
    ),
    paging: z.object({
        cursors: z.object({
            before: z.string().optional(),
            after: z.string().optional()
        }).passthrough()
    }).optional()
});
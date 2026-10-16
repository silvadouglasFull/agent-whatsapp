//@services/types/whatsapp-schema.ts
import { z } from "zod";

export const whatsAppBusinessAccountSchema = z.object({
    id: z.string(),
    name: z.string(),
    currency: z.string(),
    timezone_id: z.string(),
    message_template_namespace: z.string(),
    paging: z.object({
        cursors: z.object({
            before: z.string(),
            after: z.string()
        }).optional()
    }).optional()
});

export const whatsappRequestCodeSchema = z.object({
    whatsappBussinessPhoneNumberId: z.number(),
    codeMethod: z.union([z.literal("SMS"), z.literal("VOICE")]).optional(),
    language: z.string().optional()
});

export const whatsappVerifyCodeSchema = z.object({
    whatsappBussinessPhoneNumberId: z.number(),
    code: z.string()
});

export const whatsappRegisterPhoneSchema = z.object({
    whatsappBussinessPhoneNumberId: z.number(),
    messagingProduct: z.string(),
    pin: z.string()
});

export const whatsappCreatePhoneSchema = z.object({
    whatsappBussinessPhoneNumberId: z.number(),
    cc: z.string(),
    phoneNumber: z.string(),
    verifedName: z.string()
});

export const whatsAppAccountsResponseSchema = z.object({
    data: z.array(whatsAppBusinessAccountSchema)
});

export const whatsappRequestCodeResponseSchema = z.object({
    success: z.boolean()
});

export const whatsappVerifyCodeResponseSchema = z.object({
    success: z.boolean()
});

export const whatsappRegisterPhoneResponseSchema = z.object({
    success: z.boolean()
});

export const whatsappCreatePhoneReponseSchema = z.object({
    id: z.number()
});
export type WhatsappRequestCode = z.infer<typeof whatsappRequestCodeSchema>;
export type WhatsappRequestCodeResponse = z.infer<typeof whatsappRequestCodeResponseSchema>;
export type WhatsappVerifyCode = z.infer<typeof whatsappVerifyCodeSchema>;
export type WhatsappVerifyCodeResponse = z.infer<typeof whatsappVerifyCodeResponseSchema>;
export type WhatsappRegisterPhone = z.infer<typeof whatsappRegisterPhoneSchema>;
export type WhatsappRegisterPhoneResponse = z.infer<typeof whatsappRegisterPhoneResponseSchema>;
export type WhatsappCreatePhone = z.infer<typeof whatsappCreatePhoneSchema>;
export type WhatsappCreatePhoneReponse = z.infer<typeof whatsappCreatePhoneReponseSchema>;
export type WhatsAppAccountsResponse = z.infer<typeof whatsAppAccountsResponseSchema>;

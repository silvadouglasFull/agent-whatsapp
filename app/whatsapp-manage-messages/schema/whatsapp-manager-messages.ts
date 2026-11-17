import { recipientPhoneNumber } from "@/services/schemas/whatsapp-manage-messages";
import { z } from "zod";

export const formWhatsappSendMessageRequestParserParamsSchema = z.object({
    messagesTemplate: z.string(),
    customerName: z.string(),
    businessName: z.string(),
    recipientPhoneNumber: recipientPhoneNumber
})

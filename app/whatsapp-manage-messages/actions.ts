'use server'
import { ActionErrorStrategy } from "@/errors/action-error-strategy";
import { WhatsappGetMessagesTemplatesRequest, WhatsappGetMessagesTemplatesResponse, WhatsappSendMessageRequest, WhatsappSendMessageResponse } from "@/services/types/whatsapp-manager-messages";
import { metaWhatsappManageMessages } from "@/services/whatsapp-manage-messages";
import { ActionErrorResponse } from "@errors/types/action-error-handler";

export async function metaWhatsappSendMessage(
    whatsappSendMessageRequest: WhatsappSendMessageRequest
): Promise<WhatsappSendMessageResponse | ActionErrorResponse> {
    try {
        return await metaWhatsappManageMessages.sendMessage(whatsappSendMessageRequest)
    } catch (error) {
        return ActionErrorStrategy.handle(error)
    }
}
export async function metaWhatsappGetMessagesTemplates(whatsappGetMessagesTemplatesRequest: WhatsappGetMessagesTemplatesRequest): Promise<WhatsappGetMessagesTemplatesResponse | ActionErrorResponse> {
    try {
        return await metaWhatsappManageMessages.getMessagesTemplates(whatsappGetMessagesTemplatesRequest)
    } catch (error) {
        return ActionErrorStrategy.handle(error)
    }
}
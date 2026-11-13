import { WhatsappGetMessagesTemplatesRequest, WhatsappGetMessagesTemplatesResponse, WhatsappSendMessageRequest, WhatsappSendMessageResponse } from "@services/types/whatsapp-manager-messages";

export interface IWhatsappManageMessages {
    sendMessage(whatsappSendMessageRequest: WhatsappSendMessageRequest): Promise<WhatsappSendMessageResponse>
    getMessagesTemplates(whatsappGetMessagesTemplatesRequest: WhatsappGetMessagesTemplatesRequest): Promise<WhatsappGetMessagesTemplatesResponse>
}
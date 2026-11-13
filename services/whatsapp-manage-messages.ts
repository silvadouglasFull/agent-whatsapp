import { IWhatsappManageMessages } from "@/services/contracts/whatsapp-manage-messages-contract";
import { catchAxios } from "@/services/decorators/catch-axios";
import { whatsappGetMessagesTemplateRequestSchema, whatsappGetMessagesTemplateResponseSchema, whatsappSendMessageRequestSchema, whatsappSendMessageResponseSchema } from "@/services/schemas/whatsapp-manage-messages";
import type { WhatsappGetMessagesTemplatesRequest, WhatsappGetMessagesTemplatesResponse, WhatsappSendMessageRequest, WhatsappSendMessageResponse } from "@/services/types/whatsapp-manager-messages";
import { validateInput, validateOutput } from "@services/utils/validate.decorator";
import { BaseMetaWhatsappService } from "@services/whatsapp";

export class MetaWhatsappManageMessages extends BaseMetaWhatsappService implements IWhatsappManageMessages {
    @catchAxios()
    @validateInput(whatsappSendMessageRequestSchema)
    @validateOutput(whatsappSendMessageResponseSchema)
    public async sendMessage(whatsappSendMessageRequest: WhatsappSendMessageRequest): Promise<WhatsappSendMessageResponse> {
        const validatedData = whatsappSendMessageRequestSchema.parse(whatsappSendMessageRequest);
        const { whatsappBussinessPhoneNumberId } = whatsappSendMessageRequest as any;
        const response = await this.client!.post<WhatsappSendMessageResponse>(
            `/${whatsappBussinessPhoneNumberId}/messages`,
            {
                messaging_product: validatedData.messagingProduct,
                to: validatedData.recipientPhoneNumber,
                type: validatedData.type,
                template: validatedData.template
            }
        );
        return response.data;
    }
    @catchAxios()
    @validateInput(whatsappGetMessagesTemplateRequestSchema)
    @validateOutput(whatsappGetMessagesTemplateResponseSchema)
    public async getMessagesTemplates(whatsappGetMessagesTemplatesRequest: WhatsappGetMessagesTemplatesRequest): Promise<WhatsappGetMessagesTemplatesResponse> {
        const response = await this.client!.get<WhatsappGetMessagesTemplatesResponse>(`${whatsappGetMessagesTemplatesRequest.whatsappBussinessPhoneNumberId}/message_templates?`);
        return response.data
    }
}

export const metaWhatsappManageMessages = new MetaWhatsappManageMessages();
'use server'
import { CreateWhatsappSendMessageRequestParams, FormWhatsappSendMessageRequestParserParams, GetNumberPhoneIdParams, GetWhatsappPageDataParams } from "@/app/whatsapp-manage-messages/types/whatsapp-manage-send-message";
import { ActionErrorStrategy } from "@/errors/action-error-strategy";
import { WhatsappGetMessagesTemplatesRequest, WhatsappGetMessagesTemplatesResponse, WhatsappSendMessageRequest, WhatsappSendMessageResponse } from "@/services/types/whatsapp-manager-messages";
import { parseFormData } from "@/services/utils/form-parser";
import { whatsappFormatter } from "@/services/utils/whatsapp-formatter";
import { metaWhatsappManageMessages } from "@/services/whatsapp-manage-messages";
import { WhatsappPageDataService } from "@/services/whatsapp-manage-messages-page-data";
import { ActionErrorResponse } from "@errors/types/action-error-handler";
import { formWhatsappSendMessageRequestParserParamsSchema } from "./schema/whatsapp-manager-messages";

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
function formWhatsappSendMessageRequestParser(formData: FormData): FormWhatsappSendMessageRequestParserParams {
    return parseFormData(formData, formWhatsappSendMessageRequestParserParamsSchema)
}

function getNumberPhoneId({ phoneNumbers, whatsappBussinessPhoneNumberCurrentAccountIndex }: GetNumberPhoneIdParams): string {
    const phoneNumber = phoneNumbers.data[Number(whatsappBussinessPhoneNumberCurrentAccountIndex)]
    if (!phoneNumber) {
        throw new Error('Phone Number Not Found on PhoneNumbers List')
    }
    const whatsappBussinessPhoneNumberId = phoneNumber.id
    return whatsappBussinessPhoneNumberId
}
export async function createWhatsappSendMessagePayloadRequest(whatsappSendMessagedRequest: CreateWhatsappSendMessageRequestParams): Promise<WhatsappSendMessageRequest> {
    const payload = formWhatsappSendMessageRequestParser(whatsappSendMessagedRequest.formData)
    const whatsappBussinessPhoneNumberId = getNumberPhoneId({
        phoneNumbers: whatsappSendMessagedRequest.phoneNumbers,
        whatsappBussinessPhoneNumberCurrentAccountIndex: whatsappSendMessagedRequest.whatsappBussinessPhoneNumberCurrentAccountIndex
    })
    const formattedNumber = whatsappFormatter.format(payload.recipientPhoneNumber as string);
    const whatsappSendMessageRequest: WhatsappSendMessageRequest = {
        messagingProduct: 'whatsapp',
        recipientPhoneNumber: formattedNumber,
        whatsappBussinessPhoneNumberId: whatsappBussinessPhoneNumberId,
        template: {
            name: payload.messagesTemplate as string,
            language: {
                code: 'pt_BR'
            },
            components: [{
                type: "body",
                parameters: [
                    {
                        type: "text",
                        text: payload.customerName as string
                    },
                    {
                        type: "text",
                        text: payload.businessName as string
                    }
                ]
            }],
        },
        type: 'template'
    }
    return whatsappSendMessageRequest
}

export async function getWhatsappPageData(whatsappPageDataParams: GetWhatsappPageDataParams) {
    return await WhatsappPageDataService.getPageData(whatsappPageDataParams)
}
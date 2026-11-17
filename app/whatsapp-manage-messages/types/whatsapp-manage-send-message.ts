import { WabaPhoneNumbersResponse } from "@/services/types/whatsapp-manger-accounts";
import { formWhatsappSendMessageRequestParserParamsSchema } from "@app/whatsapp-manage-messages/schema/whatsapp-manager-messages";
import { z } from "zod";

export interface WhatsappManageSendMessagePageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
export type GetNumberPhoneIdParams = {
    phoneNumbers: Pick<WabaPhoneNumbersResponse, 'data'>,
    whatsappBussinessPhoneNumberCurrentAccountIndex: string
}
export type CreateWhatsappSendMessageRequestParams = {
    formData: FormData
} & GetNumberPhoneIdParams

export type FormWhatsappSendMessageRequestParserParams = z.infer<typeof formWhatsappSendMessageRequestParserParamsSchema>
export type GetWhatsappPageDataParams = Promise<{ [key: string]: string | string[] | undefined }>
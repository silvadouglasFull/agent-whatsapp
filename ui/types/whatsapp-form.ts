import { ActionErrorResponse } from "@/errors/types/action-error-handler";
import { WhatsappGetMessagesTemplatesResponse } from "@/services/types/whatsapp-manager-messages";
import { WabaPhoneNumbersResponse, WhatsAppAccountsResponse } from "@/services/types/whatsapp-manger-accounts";

export type WhatsappSendMessageFormProps = {
    accounts: Pick<WhatsAppAccountsResponse, 'data'>,
    phoneNumbers: Pick<WabaPhoneNumbersResponse, 'data'>
    messagesTemplate: WhatsappGetMessagesTemplatesResponse | ActionErrorResponse
    whatsappAccountsSelectionCurrentAccountIndex: string
}
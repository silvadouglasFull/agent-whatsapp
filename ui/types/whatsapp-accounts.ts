import { ActionErrorResponse } from "@/errors/types/action-error-handler";
import { WhatsappGetMessagesTemplatesResponse } from "@/services/types/whatsapp-manager-messages";
import { WhatsAppAccountsResponse, WhatsappRequestCodeResponse } from "@/services/types/whatsapp-manger-accounts";

export type WhatsAppAccountsRequestCodeResponse = WhatsappRequestCodeResponse & Partial<ActionErrorResponse> & {
    whatsappBussinessPhoneNumberId: string;
}


export type WhatsappAccontFormProps = {
    accounts: Pick<WhatsAppAccountsResponse, 'data'>
    messagesTemplate: WhatsappGetMessagesTemplatesResponse | ActionErrorResponse
    currentAccountIndex: string
}
import { metaWhatsappGetMessagesTemplates } from "@/app/whatsapp-manage-messages/actions";
import { ActionErrorResponse } from "@/errors/types/action-error-handler";
import { WabaPhoneNumbersResponse, WhatsAppAccountsResponse } from "@/services/types/whatsapp-manger-accounts";
import { metaWhatsappAccountsService } from "@/services/whatsapp-manage-accounts";
import { WhatsappGetMessagesTemplatesResponse } from "@services/types/whatsapp-manager-messages";

export interface WhatsappPageData {
    currentAccountIndex: string;
    accounts: WhatsAppAccountsResponse;
    phoneNumbers: WabaPhoneNumbersResponse;
    messagesTemplate: WhatsappGetMessagesTemplatesResponse | ActionErrorResponse
}

export class WhatsappPageDataService {
    public static async getPageData(
        searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    ): Promise<WhatsappPageData> {
        const resolvedParams = await searchParams;
        const currentAccountIndex = typeof resolvedParams.account === 'string' ? resolvedParams.account : "0";
        const accountIndexNumber = parseInt(currentAccountIndex, 10) || 0;
        const accounts = await metaWhatsappAccountsService.getOwnedAccounts();
        const safeIndex = accountIndexNumber < accounts.data.length ? accountIndexNumber : 0;
        const selectedAccount = accounts.data[safeIndex];
        const selectedAccountId = selectedAccount ? selectedAccount.id : "";
        const [phoneNumbers, messagesTemplate] = await Promise.all([
            metaWhatsappAccountsService.getWabaPhoneNumbers(selectedAccountId),
            metaWhatsappGetMessagesTemplates({
                whatsappBussinessPhoneNumberId: selectedAccountId
            })
        ]);
        return {
            currentAccountIndex,
            accounts,
            phoneNumbers,
            messagesTemplate
        };
    }
}
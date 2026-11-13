import { WabaPhoneNumbersResponse } from "@/services/types/whatsapp-manger-accounts";

export type WhatsappAccountsPhoneNumbersSelectionProps = {
    phoneNumbers: WabaPhoneNumbersResponse;
    currentAccountIndex?: string;
}
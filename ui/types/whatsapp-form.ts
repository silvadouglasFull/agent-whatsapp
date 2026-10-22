import { WhatsAppAccountsResponse } from "@/services/types/whatsapp";

export type WhatsappFormProps = {
    accounts: Pick<WhatsAppAccountsResponse, 'data'>
}
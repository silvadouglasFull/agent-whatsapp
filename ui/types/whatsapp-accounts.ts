import { ActionErrorResponse } from "@/errors/types/action-error-handler";
import { WhatsappRequestCodeResponse } from "@/services/types/whatsapp";

export type WhatsAppAccountsRequestCodeResponse = WhatsappRequestCodeResponse & Partial<ActionErrorResponse> & {
    whatsappBussinessPhoneNumberId: number;
}
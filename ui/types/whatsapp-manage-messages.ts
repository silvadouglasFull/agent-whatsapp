import { ActionErrorResponse } from "@/errors/types/action-error-handler";
import { WhatsappSendMessageResponse } from "@/services/types/whatsapp-manager-messages";

export type WhatsAppSendMessageResponse = WhatsappSendMessageResponse | Partial<ActionErrorResponse> & {
    whatsappBussinessPhoneNumberId: string;
}
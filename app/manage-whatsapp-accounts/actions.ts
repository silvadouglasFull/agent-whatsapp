'use server'
import { ActionErrorStrategy } from "@/errors/action-error-strategy";
import { metaWhatsappAccountsService } from "@/services/manager-accounts";
import { WhatsappRequestCode, WhatsappRequestCodeResponse } from "@/services/types/whatsapp";
import { ActionErrorResponse } from "@errors/types/action-error-handler";

export async function metaWhatsappRequestCode(whatsappRequestCode: WhatsappRequestCode): Promise<WhatsappRequestCodeResponse | ActionErrorResponse> {
    try {
        return await metaWhatsappAccountsService.requestCode(whatsappRequestCode)
    } catch (error) {
        return ActionErrorStrategy.handle(error)
    }
}
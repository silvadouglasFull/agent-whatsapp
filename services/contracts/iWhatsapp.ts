import { WhatsAppAccountsResponse, WhatsappCreatePhone, WhatsappCreatePhoneReponse, WhatsappRegisterPhone, WhatsappRegisterPhoneResponse, WhatsappRequestCode, WhatsappRequestCodeResponse, WhatsappVerifyCode, WhatsappVerifyCodeResponse } from "@services/types/whatsapp";

export interface IWhatsAppService {
    requestCode(whatsappRequestCode: WhatsappRequestCode): Promise<WhatsappRequestCodeResponse>;
    verifyCode(whatsappVerifyCode: WhatsappVerifyCode): Promise<WhatsappVerifyCodeResponse>;
    registerPhone(whatsappRegisterPhone: WhatsappRegisterPhone): Promise<WhatsappRegisterPhoneResponse>;
    createPhone(whatsappCreatePhone: WhatsappCreatePhone): Promise<WhatsappCreatePhoneReponse>;
    getOwnedAccounts(): Promise<WhatsAppAccountsResponse>;
}
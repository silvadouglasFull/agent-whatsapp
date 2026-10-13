export interface WhatsAppBusinessAccount {
    id: string;
    name: string;
    currency: string;
    timezone_id: string;
    message_template_namespace: string;
    paging: {
        cursors: {
            before: string;
            after: string;
        };
    };
}
export interface WhatsappRequestCode {
    whatsappBussinessPhoneNumberId: number;
    codeMethod?: 'SMS' | 'VOICE';
    language?: string
}

export interface WhatsappVerifyCode {
    whatsappBussinessPhoneNumberId: number;
    code: string
}
export interface WhatsappRegisterPhone {
    whatsappBussinessPhoneNumberId: number;
    messagingProduct: string;
    pin: string;
}
export interface WhatsappCreatePhone {
    whatsappBussinessPhoneNumberId: number;
    cc:string;
    phoneNumber:string;
    verifedName:string;
}
export interface WhatsAppAccountsResponse {
    data: WhatsAppBusinessAccount[];
}
export interface WhatsappRequestCodeResponse {
    success: boolean
}
export interface WhatsappVerifyCodeResponse {
    success: boolean
}
export interface WhatsappRegisterPhoneResponse {
    success: boolean
}
export interface WhatsappCreatePhoneReponse {
    id:number
}
export interface IWhatsAppService {
    requestCode(whatsappRequestCode: WhatsappRequestCode): Promise<WhatsappRequestCodeResponse>;
    verifyCode(whatsappVerifyCode: WhatsappVerifyCode): Promise<WhatsappVerifyCodeResponse>;
    registerPhone(whatsappRegisterPhone: WhatsappRegisterPhone): Promise<WhatsappRegisterPhoneResponse>;
    createPhone(whatsappCreatePhone: WhatsappCreatePhone):Promise<WhatsappCreatePhoneReponse>;
    getOwnedAccounts(): Promise<WhatsAppAccountsResponse>;
}
export interface WhatsAppBusinessAccount {
    id: number;
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
export type WhatsappRequestCode = {
    whatsappBussinessPhoneNumberId: string;
    codeMethod?: 'SMS' | 'VOICE';
    language?: string
}

export type WhatsappVerifyCode = {
    whatsappBussinessPhoneNumberId: string;
    code: string
}
export type WhatsappRegisterPhone = {
    whatsappBussinessPhoneNumberId: string;
    messagingProduct: string;
    pin: string;
}
export type WhatsappCreatePhone = {
    whatsappBussinessPhoneNumberId: string;
    cc: string;
    phoneNumber: string;
    verifedName: string;
}
export type WhatsAppAccountsResponse = {
    data: WhatsAppBusinessAccount[];
}
export type WhatsappRequestCodeResponse = {
    success: boolean
}
export type WhatsappVerifyCodeResponse = {
    success: boolean
}
export type WhatsappRegisterPhoneResponse = {
    success: boolean
}
export type WhatsappCreatePhoneReponse = {
    id: number
}


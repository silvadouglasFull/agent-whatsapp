import { IWhatsAppService } from '@/services/contracts/iWhatsapp';
import { catchAxios } from '@/services/decorators/catch-axios';
import type {
    WhatsAppAccountsResponse, WhatsappCreatePhone,
    WhatsappCreatePhoneReponse, WhatsappRegisterPhone,
    WhatsappRegisterPhoneResponse, WhatsappRequestCode,
    WhatsappRequestCodeResponse, WhatsappVerifyCode,
    WhatsappVerifyCodeResponse
} from '@/services/types/whatsapp';
import {
    whatsAppAccountsResponseSchema, whatsappCreatePhoneReponseSchema,
    whatsappCreatePhoneSchema, whatsappRegisterPhoneResponseSchema,
    whatsappRegisterPhoneSchema, whatsappRequestCodeResponseSchema,
    whatsappRequestCodeSchema, whatsappVerifyCodeResponseSchema,
    whatsappVerifyCodeSchema
} from '@/services/types/whatsapp-schema';
import { validateInput, validateOutput } from '@/services/utils/validate.decorator';
import axios from 'axios';
import dotenv from 'dotenv';
import { BaseMetaWhatsappService } from './whatsapp';

dotenv.config()


export class MetaWhatsappAccountsService extends BaseMetaWhatsappService implements IWhatsAppService {

    @catchAxios()
    @validateInput(whatsappRequestCodeSchema)
    @validateOutput(whatsappRequestCodeResponseSchema)
    public async requestCode({
        whatsappBussinessPhoneNumberId,
        codeMethod = 'SMS',
        language = 'pt_BR'
    }: WhatsappRequestCode): Promise<WhatsappRequestCodeResponse> {
        const response = await this.client!.post<WhatsappRequestCodeResponse>(
            `/${whatsappBussinessPhoneNumberId}/request_code`,
            {
                params: { code_method: codeMethod, language: language },
                headers: { 'Authorization': this.accessToken }
            }
        )
        return response.data
    }

    @validateInput(whatsappVerifyCodeSchema)
    @validateOutput(whatsappVerifyCodeResponseSchema)
    public async verifyCode({ whatsappBussinessPhoneNumberId, code }: WhatsappVerifyCode): Promise<WhatsappVerifyCodeResponse> {
        const response = await axios.post<WhatsappVerifyCodeResponse>(
            `/${whatsappBussinessPhoneNumberId}/verify_code`,
            {
                params: { 'code': code },
                headers: { 'Authorization': this.accessToken }
            }
        );
        return response.data
    }

    @validateInput(whatsappRegisterPhoneSchema)
    @validateOutput(whatsappRegisterPhoneResponseSchema)
    public async registerPhone({ whatsappBussinessPhoneNumberId, messagingProduct, pin }: WhatsappRegisterPhone): Promise<WhatsappRegisterPhoneResponse> {
        const response = await axios.post<WhatsappRegisterPhoneResponse>(
            `${whatsappBussinessPhoneNumberId}/register`,
            { 'messaging_product': messagingProduct, 'pin': pin },
            { headers: { 'Authorization': this.accessToken } }
        );
        return response.data
    }

    @validateInput(whatsappCreatePhoneSchema)
    @validateOutput(whatsappCreatePhoneReponseSchema)
    public async createPhone({ whatsappBussinessPhoneNumberId, cc, phoneNumber, verifedName }: WhatsappCreatePhone): Promise<WhatsappCreatePhoneReponse> {
        const response = await axios.post<WhatsappCreatePhoneReponse>(
            `${whatsappBussinessPhoneNumberId}/phone_numbers`,
            { 'cc': cc, 'phone_number': phoneNumber, 'verified_name': verifedName },
            { headers: { 'Authorization': this.accessToken } }
        );
        return response.data
    }

    @validateOutput(whatsAppAccountsResponseSchema)
    public async getOwnedAccounts(): Promise<WhatsAppAccountsResponse> {
        const response = await this.client!.get<WhatsAppAccountsResponse>(
            `/${this.wabaId}/owned_whatsapp_business_accounts`,
            { params: { access_token: this.accessToken } }
        );
        return response.data;
    }
}
export const metaWhatsappAccountsService: IWhatsAppService = new MetaWhatsappAccountsService();

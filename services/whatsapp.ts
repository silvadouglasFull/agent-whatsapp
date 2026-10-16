import { IWhatsAppService, WhatsAppAccountsResponse, WhatsappCreatePhone, WhatsappCreatePhoneReponse, WhatsappRegisterPhone, WhatsappRegisterPhoneResponse, WhatsappRequestCode, WhatsappRequestCodeResponse, WhatsappVerifyCode, WhatsappVerifyCodeResponse } from '@/services/types/whatsapp';
import axios, { AxiosInstance } from 'axios';

export class FacebookWhatsAppService implements IWhatsAppService {
    private client: AxiosInstance | null = null;
    private accessToken: string = '';
    private readonly apiVersion: string = 'v26.0';
    private wabaId: string = '';

    constructor() {
        this.accessToken = process.env.TOKEN_WHATSAPP as string;
        this.wabaId = String(process.env.BUSSINESS_ID);
        this.client = axios.create({
            baseURL: `https://graph.facebook.com/${this.apiVersion}/${this.wabaId}`,
        });
    }

    public async requestCode({
        whatsappBussinessPhoneNumberId,
        codeMethod = 'SMS',
        language = 'pt_BR'
    }: WhatsappRequestCode): Promise<WhatsappRequestCodeResponse> {
        const response = await this.client!.post<WhatsappRequestCodeResponse>(
            `/${whatsappBussinessPhoneNumberId}/request_code`,
            {
                params: {
                    code_method: codeMethod,
                    language: language
                },
                headers: {
                    'Authorization': this.accessToken
                }
            }
        )
        return response.data
    }
    public async verifyCode({ whatsappBussinessPhoneNumberId, code }: WhatsappVerifyCode): Promise<WhatsappVerifyCodeResponse> {
        const response = await axios.post<WhatsappVerifyCodeResponse>(
            `/${whatsappBussinessPhoneNumberId}/verify_code`,
            {
                params: {
                    'code': code
                },
                headers: {
                    'Authorization': this.accessToken
                }
            }
        );
        return response.data
    }
    public async registerPhone({ whatsappBussinessPhoneNumberId, messagingProduct, pin }: WhatsappRegisterPhone): Promise<WhatsappRegisterPhoneResponse> {
        const response = await axios.post<WhatsappRegisterPhoneResponse>(
            `${whatsappBussinessPhoneNumberId}/register`,
            {
                'messaging_product': messagingProduct,
                'pin': pin
            },
            {
                headers: {
                    'Authorization': this.accessToken
                }
            }
        );
        return response.data
    }
    public async createPhone({ whatsappBussinessPhoneNumberId, cc, phoneNumber, verifedName }: WhatsappCreatePhone): Promise<WhatsappCreatePhoneReponse> {
        const response = await axios.post<WhatsappCreatePhoneReponse>(
            `${whatsappBussinessPhoneNumberId}/phone_numbers`,
            {
                'cc': cc,
                'phone_number': phoneNumber,
                'verified_name': verifedName
            },
            {
                headers: {
                    'Authorization': this.accessToken
                }
            }
        );
        return response.data
    }
    public async getOwnedAccounts(): Promise<WhatsAppAccountsResponse> {
        const response = await this.client!.get<WhatsAppAccountsResponse>(
            `/owned_whatsapp_business_accounts`,
            {
                params: {
                    access_token: this.accessToken,
                },
            }
        );
        return response.data;
    }
}
export const facebookWhatsAppService: IWhatsAppService = new FacebookWhatsAppService();

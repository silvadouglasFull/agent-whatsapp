import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';

dotenv.config()


export class BaseMetaWhatsappService {
    public readonly client: AxiosInstance | null = null;
    public accessToken: string = '';
    public readonly apiVersion: string = 'v26.0';
    public wabaId: string = '';

    constructor() {
        this.accessToken = process.env.TOKEN_WHATSAPP as string;
        this.wabaId = process.env.BUSSINESS_ID as string
        this.client = axios.create({
            baseURL: `https://graph.facebook.com/${this.apiVersion}`,
        });
    }

}

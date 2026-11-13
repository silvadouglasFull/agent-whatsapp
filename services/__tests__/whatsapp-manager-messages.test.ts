/**
 * @file services/__tests__/whatsapp-manager-messages.test.ts
 * @description Unit tests for MetaWhatsappManageMessages service with correct schema keys.
 */

import { MetaWhatsappManageMessages } from '@/services/whatsapp-manage-messages';
import axios from 'axios';
import { WhatsappSendMessageRequest, WhatsappSendMessageResponse } from '../types/whatsapp-manager-messages';

// Mocking axios module to intercept HTTP requests during testing
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('MetaWhatsappManageMessages', () => {
    let whatsappService: MetaWhatsappManageMessages;
    let mockClient: {
        post: jest.Mock;
    };

    beforeEach(() => {
        jest.clearAllMocks();

        mockClient = {
            post: jest.fn(),
        };

        mockedAxios.create.mockReturnValue(mockClient as unknown as axios.AxiosInstance);
        whatsappService = new MetaWhatsappManageMessages();
    });

    it('should send WhatsApp message successfully when valid request data is provided', async () => {
        const requestPayload: WhatsappSendMessageRequest = {
            whatsappBussinessPhoneNumberId: '123456',
            messagingProduct: 'whatsapp',
            recipientPhoneNumber: '+5511999999999',
            type: 'template',
            template: {
                name: 'hello_world',
                language: {
                    code: 'pt_BR'
                }
            }
        };

        const expectedResponse: WhatsappSendMessageResponse = {
            contacts: [
                {
                    input: '11999999999',
                    wa_id: '16315551002'
                },
            ],
            messaging_product: 'whatsapp',
            messages: [{ id: 'wamid.123' }]
        };

        mockClient.post.mockResolvedValueOnce({ data: expectedResponse });

        // Act
        const result = await whatsappService.sendMessage(requestPayload);

        // Assert
        expect(mockClient.post).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedResponse);
    });
});
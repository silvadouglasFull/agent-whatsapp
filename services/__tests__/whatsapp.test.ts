/**
 * @file services/__tests__/whatsapp.test.ts
 * @description Unit tests for FacebookWhatsAppService class covering all service methods.
 */

import { FacebookWhatsAppService } from '@/services/whatsapp';
import axios from 'axios';

// Mocking axios module to intercept HTTP requests during testing
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('FacebookWhatsAppService', () => {
  let whatsappService: FacebookWhatsAppService;
  let mockClient: {
    get: jest.Mock;
    post: jest.Mock;
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockClient = {
      get: jest.fn(),
      post: jest.fn(),
    };

    mockedAxios.create.mockReturnValue(mockClient as unknown as axios.AxiosInstance);
    whatsappService = new FacebookWhatsAppService();
  });

  /**
   * Tests if requestCode successfully requests a verification code.
   */
  it('should request verification code successfully', async () => {
    const mockResponse = { data: { success: true } };
    mockClient.post.mockResolvedValue(mockResponse);

    const result = await whatsappService.requestCode({
      whatsappBussinessPhoneNumberId: '123',
      codeMethod: 'SMS',
      language: 'pt_BR',
    });

    expect(result).toEqual(mockResponse.data);
    expect(mockClient.post).toHaveBeenCalledWith(
      '/123/request_code',
      expect.any(Object)
    );
  });

  /**
   * Tests if verifyCode successfully validates the code.
   */
  it('should verify code successfully', async () => {
    const mockResponse = { data: { success: true } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    const result = await whatsappService.verifyCode({
      whatsappBussinessPhoneNumberId: '123',
      code: '123456',
    });

    expect(result).toEqual(mockResponse.data);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      '/123/verify_code',
      expect.any(Object)
    );
  });

  /**
   * Tests if registerPhone successfully registers the phone number.
   */
  it('should register phone successfully', async () => {
    const mockResponse = { data: { success: true } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    const result = await whatsappService.registerPhone({
      whatsappBussinessPhoneNumberId: '123',
      messagingProduct: 'whatsapp',
      pin: '123456',
    });

    expect(result).toEqual(mockResponse.data);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      '123/register',
      expect.any(Object),
      expect.any(Object)
    );
  });

  /**
   * Tests if createPhone successfully creates a phone entry.
   */
  it('should create phone successfully', async () => {
    const mockResponse = { data: { success: true } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    const result = await whatsappService.createPhone({
      whatsappBussinessPhoneNumberId: '123',
      cc: '55',
      phoneNumber: '999999999',
      verifedName: 'Test Name',
    });

    expect(result).toEqual(mockResponse.data);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      '123/phone_numbers',
      expect.any(Object),
      expect.any(Object)
    );
  });

  /**
   * Tests if getOwnedAccounts successfully retrieves business accounts.
   */
  it('should fetch owned whatsapp business accounts successfully', async () => {
    const mockResponse = {
      data: {
        data: [{ id: '123456', name: 'Test Business' }],
      },
    };
    mockClient.get.mockResolvedValue(mockResponse);

    const result = await whatsappService.getOwnedAccounts();

    expect(result).toEqual(mockResponse.data);
    expect(mockClient.get).toHaveBeenCalledWith(
      '/owned_whatsapp_business_accounts',
      expect.any(Object)
    );
  });
});
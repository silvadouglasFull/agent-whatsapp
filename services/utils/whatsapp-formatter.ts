import { IWhatsappFormatter } from "@services/utils/contracts/whatsapp-formatters";


export class WhatsappFormatter implements IWhatsappFormatter {
    private readonly whatsappRegex = /^55\d{11}$/;

    public format(input: string): string {
        if (!input) {
            throw new Error("Input string cannot be null or empty.");
        }
        const cleanedDigits = input.replace(/\D/g, "");

        if (!this.validate(cleanedDigits)) {
            throw new Error(`Invalid WhatsApp number format: "${input}". Expected format: 55XXXXXXXXXXX.`);
        }

        return cleanedDigits;
    }
    public validate(input: string): boolean {
        return this.whatsappRegex.test(input);
    }
}

export const whatsappFormatter = new WhatsappFormatter();
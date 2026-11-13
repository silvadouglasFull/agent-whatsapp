export interface IWhatsappFormatter {
    format(input: string): string;
    validate(input: string): boolean;
}

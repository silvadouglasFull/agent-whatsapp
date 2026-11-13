import { ChangeEvent } from "react";

export interface IWhatsappAccountsPhoneNumbers {
    whatsappBussinessPhoneNumberCurrentAccountIndex: string;
    handleAccountPhoneNumberChange(event: ChangeEvent<HTMLSelectElement>): void;
}

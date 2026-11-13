"use client";

import { useWhatsappAccountSelection } from "@/hooks/use-whatsapp-account-phone-numbers-selection";
import { WhatsappAccountsPhoneNumbersSelectionProps } from '@ui/types/whatsapp-accounts-phone-numbers-selector';

export function WhatsappAccountsPhoneNumbersSelection({ phoneNumbers }: WhatsappAccountsPhoneNumbersSelectionProps) {
    const { whatsappBussinessPhoneNumberCurrentAccountIndex, handleAccountPhoneNumberChange } = useWhatsappAccountSelection();

    return (
        <div className="mb-5">
            <label htmlFor="whatsappBussinessPhoneNumberId" className="block mb-2.5 text-sm font-medium">
                From
            </label>
            <select
                id="whatsappBussinessPhoneNumberId"
                name="whatsappBussinessPhoneNumberId"
                onChange={handleAccountPhoneNumberChange}
                value={whatsappBussinessPhoneNumberCurrentAccountIndex}
                className="text-dark bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
            >
                {phoneNumbers.data && phoneNumbers.data.map((phoneNumber, index) => (
                    <option key={phoneNumber.id} value={index}>
                        {phoneNumber.verified_name || phoneNumber.display_phone_number}
                    </option>
                ))}
            </select>
        </div>
    );
}
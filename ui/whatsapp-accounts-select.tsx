"use client"

import { WhatsappAccontFormProps } from "@ui/types/whatsapp-accounts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
export function WhatsappAccountsSelection({ accounts, currentAccountIndex }: Pick<WhatsappAccontFormProps, 'accounts' | 'currentAccountIndex'>) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    currentAccountIndex = searchParams.get("account") || "0";
    async function handleChange(event: ChangeEvent<HTMLSelectElement>) {
        const selectedIndex = event.target.value;
        const params = new URLSearchParams(searchParams.toString());
        params.set("account", selectedIndex);
        router.replace(`${pathname}?${params.toString()}`);
    }
    return (
        <div className="mb-5">
            <label htmlFor="whatsappBussinessPhoneNumberId" className="block mb-2.5 text-sm font-medium">
                Account
            </label>
            <select
                id="whatsappBussinessPhoneNumberId"
                name="whatsappBussinessPhoneNumberId"
                onChange={handleChange}
                value={currentAccountIndex}
                className="text-dark bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
            >
                {accounts.data && accounts.data.map((account, index) => (
                    <option key={account.id} value={index}>
                        {account.name}
                    </option>
                ))}
            </select>
        </div>

    )
}

'use client'
import { IWhatsappAccountsPhoneNumbers } from "@hooks/types/use-whatsapp-accounts-phone-numbers-selector";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

type SearchParamsType = ReturnType<typeof useSearchParams>;
type RouterType = ReturnType<typeof useRouter>;

export class WhatsappAccountPhoneNumbersSelectionHandler implements IWhatsappAccountsPhoneNumbers {
    constructor(
        private readonly router: RouterType,
        private readonly pathname: string,
        private readonly searchParams: SearchParamsType,
        public readonly whatsappBussinessPhoneNumberCurrentAccountIndex: string
    ) { }

    public handleAccountPhoneNumberChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        const selectedIndex = event.target.value;
        const params = new URLSearchParams(this.searchParams.toString());
        params.set("whatsappBussinessPhoneNumber", selectedIndex);
        this.router.replace(`${this.pathname}?${params.toString()}`);
    };
}

export function useWhatsappAccountSelection(): IWhatsappAccountsPhoneNumbers {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentAccountIndex = searchParams.get("whatsappBussinessPhoneNumber") || "0";

    return new WhatsappAccountPhoneNumbersSelectionHandler(router, pathname, searchParams, currentAccountIndex);
}
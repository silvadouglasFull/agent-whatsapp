
'use client'
import { IWhatsappManageTemplateMessage } from "@hooks/types/use-whatsapp-send-message";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

type SearchParamsType = ReturnType<typeof useSearchParams>;
type RouterType = ReturnType<typeof useRouter>;

export class WhatsappManageTemplateMessageSelectionHandler implements IWhatsappManageTemplateMessage {
    constructor(
        private readonly router: RouterType,
        private readonly pathname: string,
        private readonly searchParams: SearchParamsType,
        public readonly whatsappManageTemplateMessageCurrentIndex: string
    ) { }

    public handleManageTemplateMessageChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        const selectedIndex = event.target.value;
        const params = new URLSearchParams(this.searchParams.toString());
        params.set("whatsappManageTemplateMessageCurrent", selectedIndex);
        this.router.replace(`${this.pathname}?${params.toString()}`);
    };
}

export function useWhatsappManageTemplateMessageSelection(): IWhatsappManageTemplateMessage {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentAccountIndex = searchParams.get("whatsappManageTemplateMessageCurrent") || "0";

    return new WhatsappManageTemplateMessageSelectionHandler(router, pathname, searchParams, currentAccountIndex);
}
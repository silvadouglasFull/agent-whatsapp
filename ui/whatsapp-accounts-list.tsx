'use client'
import { metaWhatsappRequestCode } from "@/app/whatsapp-manage-accounts/actions";
import { WhatsappRequestCode } from "@/services/types/whatsapp-manger-accounts";
import { WhatsappAccontFormProps, WhatsAppAccountsRequestCodeResponse } from "@ui/types/whatsapp-accounts";
import { useState, useTransition } from "react";
export function WhatsappAccountsList({ accounts }: Pick<WhatsappAccontFormProps, 'accounts'>) {
    const [isPending, startTransition] = useTransition();
    const [response, setResponse] = useState<WhatsAppAccountsRequestCodeResponse | null>(null)
    function handleClick(whatsappRequestCode: WhatsappRequestCode) {
        startTransition(async () => {
            const response = await metaWhatsappRequestCode(whatsappRequestCode)
            if ('error' in response && !response.success) {
                setResponse({
                    error: response.error,
                    success: response.success,
                    whatsappBussinessPhoneNumberId: whatsappRequestCode.whatsappBussinessPhoneNumberId
                })
            } else {
                setResponse({
                    ...response,
                    whatsappBussinessPhoneNumberId: whatsappRequestCode.whatsappBussinessPhoneNumberId
                })
            }
        })
    }
    return (
        <>
            <ul className="p-5 max-w-md space-y-1 text-body list-inside">
                {response?.error && (<span className="mb-3 mt-3 text-warning">
                    {response.error}
                </span>)}
                {response?.success && (
                    <span className="mb-3 mt-3 text-success">
                        Send Code Success!
                    </span>
                )}
                {accounts.data.length && accounts.data.map(account => (
                    <li
                        key={account.id}
                        className="flex items-center justify-between gap-5"
                    >
                        <span className="text-center text-light">
                            {account.name}
                        </span>
                        <button
                            className="bg-blue-500 disabled:bg-gray-400 text-white p-2 rounded mb-4"
                            onClick={() => handleClick({ whatsappBussinessPhoneNumberId: account.id })}
                            disabled={isPending}
                        >
                            Request Code
                        </button>
                    </li>
                ))}
            </ul >
        </>
    )
}
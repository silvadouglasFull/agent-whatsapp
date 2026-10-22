'use client'
import { metaWhatsappRequestCode } from "@/app/manage-whatsapp-accounts/actions";
import { WhatsappRequestCode } from "@/services/types/whatsapp";
import { WhatsAppAccountsRequestCodeResponse } from "@ui/types/whatsapp-accounts";
import { WhatsappFormProps } from "@ui/types/whatsapp-form";
import { useState, useTransition } from "react";
export function WhatsappAccountsList({ accounts }: WhatsappFormProps) {
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
            <ul className="max-w-md space-y-1 text-body list-inside" style={{
                cursor: 'pointer'
            }}>
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
                        className="flex items-center"
                    >
                        <button
                            className="bg-blue-500 disabled:bg-gray-400 text-white p-2 rounded mb-4"
                            onClick={() => handleClick({ whatsappBussinessPhoneNumberId: Number(account.id) })}
                            disabled={isPending}
                        >
                            {account.name}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}
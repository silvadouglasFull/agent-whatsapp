"use client"

import { createWhatsappSendMessagePayloadRequest, metaWhatsappSendMessage } from "@/app/whatsapp-manage-messages/actions";
import { useWhatsappAccountSelection } from "@/hooks/use-whatsapp-account-phone-numbers-selection";
import { WhatsappSendMessageFormProps } from "@ui/types/whatsapp-form";
import { WhatsappAccountsPhoneNumbersSelection } from "@ui/whatsapp-accounts-phone-numbers";
import { WhatsappAccountsSelection } from "@ui/whatsapp-accounts-select";
import { WhatsappManageMessagesTemplateMessageSelector } from "@ui/whatsapp-manage-messages-template-message-selector";
import { WhatsappManageSendMessageComponentFields } from "@ui/whatsapp-manage-send-message-component-fields";
import { WhatsappManageSendMessagePreview } from "./whatsapp-manage-send-message-preview/whatsapp-send-message-preview";

export default function WhatsappSendMessageForm({
    accounts,
    phoneNumbers,
    messagesTemplate,
    whatsappAccountsSelectionCurrentAccountIndex
}: WhatsappSendMessageFormProps) {
    const { whatsappBussinessPhoneNumberCurrentAccountIndex } = useWhatsappAccountSelection()
    async function handleWhatsappSendMessageForm(formData: FormData): Promise<void> {
        const whatsappSendMessageRequest = await createWhatsappSendMessagePayloadRequest({
            formData,
            phoneNumbers,
            whatsappBussinessPhoneNumberCurrentAccountIndex
        })
        const response = await metaWhatsappSendMessage(whatsappSendMessageRequest)
        console.log('Esse foi o resultado:',
            response
        )
    }
    return (
        <form className="max-w-sm mx-auto flex-1" action={handleWhatsappSendMessageForm}>
            <WhatsappAccountsSelection
                currentAccountIndex={whatsappAccountsSelectionCurrentAccountIndex}
                accounts={accounts} />
            <WhatsappAccountsPhoneNumbersSelection phoneNumbers={phoneNumbers} currentAccountIndex={whatsappBussinessPhoneNumberCurrentAccountIndex} />
            <WhatsappManageMessagesTemplateMessageSelector messagesTemplate={messagesTemplate} />
            <div className="mb-5 mx-w-sm mx-auto">
                <label htmlFor="recipientPhoneNumber" className="block mb-2.5 text-sm font-medium">To</label>
                <input id="recipientPhoneNumber" name="recipientPhoneNumber"
                    type="tel"
                    required
                    className="text-dark bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
                    placeholder="Write whatsapp with +..." />
            </div>
            <WhatsappManageSendMessageComponentFields messagesTemplate={messagesTemplate} />
            <WhatsappManageSendMessagePreview messagesTemplate={messagesTemplate} />
            <div className="mb-5">
                <button type="submit" className="text-white bg-success box-border border border-transparent hover:bg-success-strong focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                    Enviar Mensagem
                </button>
            </div>
        </form>
    )
}
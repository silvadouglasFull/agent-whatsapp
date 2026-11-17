"use client";

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
    const { whatsappBussinessPhoneNumberCurrentAccountIndex } = useWhatsappAccountSelection();

    async function handleWhatsappSendMessageForm(formData: FormData): Promise<void> {
        const whatsappSendMessageRequest = await createWhatsappSendMessagePayloadRequest({
            formData,
            phoneNumbers,
            whatsappBussinessPhoneNumberCurrentAccountIndex
        });
        const response = await metaWhatsappSendMessage(whatsappSendMessageRequest);
        console.log('Esse foi o resultado:', response);
    }

    return (
        <form className="w-full" action={handleWhatsappSendMessageForm}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                <div className="lg:col-span-7 flex flex-col gap-5 bg-neutral-secondary-light p-6 rounded-xl border border-default-medium shadow-sm">
                    <h2 className="text-lg font-semibold text-foreground border-b border-default-medium pb-3">
                        Configurações do Envio
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <WhatsappAccountsSelection
                            currentAccountIndex={whatsappAccountsSelectionCurrentAccountIndex}
                            accounts={accounts}
                        />
                        <WhatsappAccountsPhoneNumbersSelection
                            phoneNumbers={phoneNumbers}
                            currentAccountIndex={whatsappBussinessPhoneNumberCurrentAccountIndex}
                        />
                    </div>

                    <WhatsappManageMessagesTemplateMessageSelector messagesTemplate={messagesTemplate} />

                    <div>
                        <label htmlFor="recipientPhoneNumber" className="block mb-2 text-sm font-medium text-foreground">
                            To (Número do Destinatário)
                        </label>
                        <input
                            id="recipientPhoneNumber"
                            name="recipientPhoneNumber"
                            type="tel"
                            required
                            className="text-dark bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
                            placeholder="Ex: +5511999999999"
                        />
                    </div>

                    <WhatsappManageSendMessageComponentFields messagesTemplate={messagesTemplate} />

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full md:w-auto text-white bg-success hover:bg-success-strong focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-base text-sm px-6 py-3 focus:outline-none transition-colors"
                        >
                            Enviar Mensagem
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-5 sticky top-6 bg-neutral-secondary-light p-6 rounded-xl border border-default-medium shadow-md flex flex-col">
                    <div className="flex items-center justify-between border-b border-default-medium pb-3 mb-4">
                        <h2 className="text-lg font-semibold text-foreground">
                            Pré-visualização
                        </h2>
                        <span className="text-xs px-2.5 py-1 bg-brand/10 text-brand rounded-full font-medium">
                            WhatsApp Live Preview
                        </span>
                    </div>

                    <div className="w-full overflow-hidden">
                        <WhatsappManageSendMessagePreview messagesTemplate={messagesTemplate} />
                    </div>
                </div>

            </div>
        </form>
    );
}
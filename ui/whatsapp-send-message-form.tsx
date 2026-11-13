"use client"

import { metaWhatsappSendMessage } from "@/app/whatsapp-manage-messages/actions";
import { useWhatsappAccountSelection } from "@/hooks/use-whatsapp-account-phone-numbers-selection";
import { WhatsappSendMessageRequest } from "@/services/types/whatsapp-manager-messages";
import { whatsappFormatter } from "@/services/utils/whatsapp-formatter";
import { WhatsappSendMessageFormProps } from "@ui/types/whatsapp-form";
import { WhatsappAccountsPhoneNumbersSelection } from "@ui/whatsapp-accounts-phone-numbers";
import { WhatsappAccountsSelection } from "./whatsapp-accounts-select";

export function WhatsappSendMessageForm({
    accounts,
    phoneNumbers,
    messagesTemplate,
    whatsappAccountsSelectionCurrentAccountIndex
}: WhatsappSendMessageFormProps) {
    const { whatsappBussinessPhoneNumberCurrentAccountIndex } = useWhatsappAccountSelection()
    async function handleWhatsappSendMessageForm(formData: FormData): Promise<void> {
        const rawData = Object.fromEntries(formData.entries());
        const phoneNumber = phoneNumbers.data[Number(whatsappBussinessPhoneNumberCurrentAccountIndex)]
        if (!phoneNumber) {
            return alert('Phone Number Not Found')
        }
        const whatsappBussinessPhoneNumberId = phoneNumber.id
        console.log({
            phoneNumbers: phoneNumbers.data,
            whatsappBussinessPhoneNumberCurrentAccountIndex,
            whatsappBussinessPhoneNumberId
        })
        const formattedNumber = whatsappFormatter.format(rawData.recipientPhoneNumber as string);
        const whatsappSendMessageRequest: WhatsappSendMessageRequest = {
            messagingProduct: 'whatsapp',
            recipientPhoneNumber: formattedNumber,
            whatsappBussinessPhoneNumberId: whatsappBussinessPhoneNumberId,
            template: {
                name: rawData.messagesTemplate as string,
                language: {
                    code: 'pt_BR'
                },
                components: [{
                    type: "body",
                    parameters: [
                        {
                            type: "text",
                            text: rawData.customerName as string
                        },
                        {
                            type: "text",
                            text: rawData.businessName as string
                        }
                    ]
                }],
            },
            type: 'template'
        }
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
            <div className="mb-5">
                <label htmlFor="messagesTemplate" className="block mb-2.5 text-sm font-medium">
                    Template Message
                </label>
                <select id="messagesTemplate" name="messagesTemplate"
                    required
                    className="text-dark bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
                >
                    {'error' in messagesTemplate ? (
                        <option value={'hellow_word'}>
                            Hellow Word
                        </option>
                    ) : (
                        messagesTemplate.data?.map((messageTemplate) => (
                            <option key={messageTemplate.id} value={messageTemplate.name}>
                                {messageTemplate.name}
                            </option>
                        ))
                    )}
                </select>
            </div>
            <div className="mb-5 mx-w-sm mx-auto">
                <label htmlFor="customerName" className="block mb-2.5 text-sm font-medium">
                    Client Name
                </label>
                <input id="customerName" name="customerName"
                    type="text"
                    required
                    className="text-dark bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
                    placeholder="The cliente name" />
            </div>
            <div className="mb-5 mx-w-sm mx-auto">
                <label htmlFor="businessName" className="block mb-2.5 text-sm font-medium">
                    Business Name
                </label>
                <input id="businessName" name="businessName"
                    type="text"
                    required
                    className="text-dark bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
                    placeholder="The business name" />
            </div>
            <div className="mb-5 mx-w-sm mx-auto">
                <label htmlFor="recipientPhoneNumber" className="block mb-2.5 text-sm font-medium">To</label>
                <input id="recipientPhoneNumber" name="recipientPhoneNumber"
                    type="tel"
                    required
                    className="text-dark bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
                    placeholder="Write whatsapp with +..." />
            </div>
            {'error' in messagesTemplate ? (
                <p>Error</p>
            ) : (
                messagesTemplate.data[0].components.length &&
                messagesTemplate.data[0].components.filter(component => component.text)
                    .map((component, i) => (
                        <div className="mb-5 mx-w-sm mx-auto">
                            <label htmlFor="recipientPhoneNumber" className="block mb-2.5 text-sm font-medium">
                                Components {component.format || component.type}
                            </label>
                            <textarea
                                key={i}
                                name="components[]"
                                required
                                className="mb-4 text-dark bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
                                placeholder="Write whatsapp with +..."
                                rows={6}
                            >
                                {component.text}
                            </textarea>

                        </div>
                    ))
            )}
            <div className="mb-5">
                <button type="submit" className="text-white bg-success box-border border border-transparent hover:bg-success-strong focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                    Enviar Mensagem
                </button>
            </div>
        </form>
    )
}
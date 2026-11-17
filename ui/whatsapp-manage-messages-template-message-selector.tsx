'use client'
import { WhatsappSendMessageFormProps } from "@ui/types/whatsapp-form";

export function WhatsappManageMessagesTemplateMessageSelector({ messagesTemplate }: Pick<WhatsappSendMessageFormProps, 'messagesTemplate'>) {
    return (
        <>
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
        </>
    )
}
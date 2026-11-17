
import { useWhatsappTemplateMessageFindComponentsMessage } from "@/hooks/use-whatsapp-template-message-find-components-message";
import { WhatsappSendMessageFormProps } from "@ui/types/whatsapp-form";

export function WhatsappManageSendMessageComponentFields({
    messagesTemplate
}: Pick<WhatsappSendMessageFormProps, 'messagesTemplate'>) {
    if ('error' in messagesTemplate) {
        return (
            <div className="p-4 rounded-lg bg-red-100 text-red-700 text-sm">
                Error loading template components.
            </div>
        );
    }

    if (!messagesTemplate.data.length) {
        return (
            <div className="p-4 rounded-lg bg-neutral-100 text-neutral-500 text-sm">
                No message template available to show components.
            </div>
        );
    }

    const { templateMessageComponents } = useWhatsappTemplateMessageFindComponentsMessage(messagesTemplate);

    return (
        <div className="mb-5 flex flex-col">
            <span className="block mb-2 text-sm font-medium text-foreground">
                Fields Components
            </span>
            {templateMessageComponents.length > 0 && (
                templateMessageComponents.map((component, i) => (
                    <div
                        className="flex flex-col gap-2 text-sm font-normal"
                        key={`${i}-${component.format}`}
                    >
                        {component.example?.body_text_named_params?.map(bodyTextNamedParam => (
                            <div className="mb-5 w-full" key={bodyTextNamedParam.param_name}>
                                <label htmlFor={bodyTextNamedParam.param_name} className="block mb-2.5 text-sm font-medium">
                                    {bodyTextNamedParam.param_name}
                                </label>
                                <input id={bodyTextNamedParam.param_name} name={bodyTextNamedParam.param_name}
                                    type="text"
                                    required
                                    className="text-dark bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
                                    placeholder={bodyTextNamedParam.example} />
                            </div>

                        ))}
                    </div>
                ))
            )}
        </div>
    );
}

import { useWhatsappTemplateMessageFindComponentsMessage } from "@/hooks/use-whatsapp-template-message-find-components-message";
import { RealTimeClock } from "@ui/real-time-clock";
import { WhatsappManageSendMessagePreviewProps } from "@ui/types/whatsapp-manage-send-message-preview";
import { getNamedParams, replaceTextNamedParam } from "@ui/whatsapp-manage-send-message-preview/actions";
import Image from "next/image";

export function WhatsappManageSendMessagePreview({
    messagesTemplate
}: WhatsappManageSendMessagePreviewProps) {
    if ('error' in messagesTemplate) {
        return (
            <div className="p-4 rounded-lg bg-red-100 text-red-700 text-sm">
                Error loading template preview.
            </div>
        );
    }

    if (!messagesTemplate.data.length) {
        return (
            <div className="p-4 rounded-lg bg-neutral-100 text-neutral-500 text-sm">
                No message template available to show preview.
            </div>
        );
    }

    const { templateMessageComponents } = useWhatsappTemplateMessageFindComponentsMessage(messagesTemplate);

    return (
        <div className="mb-5 flex flex-col">
            <span className="block mb-2 text-sm font-medium text-foreground">
                Message Preview
            </span>

            <div className="w-full bg-[#efeae2] p-4 rounded-xl border border-default-medium shadow-inner flex justify-end">

                <div className="max-w-[85%] sm:max-w-[70%] bg-[#d9fdd3] text-[#111b21] rounded-lg rounded-tr-none p-2 shadow-sm flex flex-col gap-2 relative">

                    {templateMessageComponents.length > 0 && (
                        templateMessageComponents.map((component, i) => (
                            <div
                                className="flex flex-col gap-2 text-sm font-normal"
                                key={`${i}-${component.type}`}
                            >
                                {(typeof component.example === 'object' && component.format?.toLowerCase() === 'image') && (
                                    <div className="flex items-center justify-center overflow-hidden rounded-md">
                                        {component.example.header_handle?.map((header: string, index: number) => (
                                            <div className="relative w-full h-48 overflow-hidden rounded-md" key={index}>
                                                <Image
                                                    src={header}
                                                    alt={component.text || 'WhatsApp message header image'}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className="object-cover"
                                                    priority
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {component.text && (
                                    <div className="px-1 py-0.5 break-words whitespace-pre-wrap leading-relaxed">
                                        {replaceTextNamedParam({
                                            text: component.text,
                                            namedParams: getNamedParams(component.example?.body_text_named_params),
                                            valuesOfParam: ['test', 'test2']
                                        })}
                                    </div>
                                )}
                            </div>
                        ))
                    )}

                    <div className="flex items-center justify-end gap-1 select-none mt-1">
                        <span className="text-[10px] text-neutral-500 font-sans">
                            <RealTimeClock />
                        </span>
                        <svg className="w-4 h-3 text-[#53bdeb]" viewBox="0 0 16 11" fill="currentColor">
                            <path d="M11.071 0.658L4.5 7.229L1.929 4.658L0.5 6.089L4.5 10.089L12.5 2.089L11.071 0.658ZM15.071 0.658L13.642 0.5L7.222 6.921L7.929 7.628L15.071 0.658Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
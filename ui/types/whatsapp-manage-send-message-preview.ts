import { bodyTextNamedParams } from "@/services/schemas/whatsapp-manage-messages";
import { WhatsappSendMessageFormProps } from "@ui/types/whatsapp-form";
import { z } from "zod";

export type ReplaceTextNamedParam = {
    text: string,
    namedParams: string[]
    valuesOfParam: string[]
}
export type WhatsappManageSendMessagePreviewProps = Pick<WhatsappSendMessageFormProps, 'messagesTemplate'>

export type WhatsappTextNamedParams = z.infer<typeof bodyTextNamedParams>
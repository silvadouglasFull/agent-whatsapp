import { TemplateReplacer } from "@/services/utils/template-replacer";
import { ReplaceTextNamedParam, WhatsappTextNamedParams } from "@ui/types/whatsapp-manage-send-message-preview";

export function replaceTextNamedParam({
    namedParams,
    text,
    valuesOfParam
}: ReplaceTextNamedParam): string {
    const replacer = new TemplateReplacer();
    return replacer.replace(text, namedParams, valuesOfParam);
}

export function getNamedParams(whatsappTextNamedParams: WhatsappTextNamedParams): string[] {
    if (!whatsappTextNamedParams?.length) {
        return []
    }
    const namedParams = whatsappTextNamedParams;
    if (!namedParams) {
        return [];
    }
    return namedParams.map(namedParam => namedParam.param_name);
}
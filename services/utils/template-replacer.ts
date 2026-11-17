import { ITemplateReplacer } from "@services/utils/contracts/template-replacer";

export class TemplateReplacer implements ITemplateReplacer {
    public replace(text: string, namedParams: string[], valuesOfParam: string[]): string {
        if (!text || !valuesOfParam.length) {
            return "";
        }
        const escapedParams = namedParams.map(param =>
            param.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        );

        const combinedParamsPattern = escapedParams.join('|');

        const regex = new RegExp(`\\{\\{\\s*(${combinedParamsPattern})\\s*\\}\\}`, 'g');
        let currentIndex = 0;
        return text.replace(regex, (match) => {
            if (currentIndex < valuesOfParam.length) {
                const replacement = valuesOfParam[currentIndex];
                currentIndex++;
                return replacement;
            }
            return match;
        });
    }
}
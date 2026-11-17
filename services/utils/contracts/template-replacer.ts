export interface ITemplateReplacer {
    replace(text: string, namedParams: string[], valueOfParam: string[]): string;
}

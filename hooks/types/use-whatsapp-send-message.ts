import { ChangeEvent } from "react";

export interface IWhatsappManageTemplateMessage {
    whatsappManageTemplateMessageCurrentIndex: string;
    handleManageTemplateMessageChange(event: ChangeEvent<HTMLSelectElement>): void;
}

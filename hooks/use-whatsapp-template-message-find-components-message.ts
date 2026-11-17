import { WhatsappGetMessagesTemplatesResponse } from "@/services/types/whatsapp-manager-messages";
import { WhatsappComponentsArrayType } from "@hooks/types/whatsapp-template-mesage-component";
import { useWhatsappManageTemplateMessageSelection } from "@hooks/use-whatsapp-template-message-selection";
export function useWhatsappTemplateMessageFindComponentsMessage(messagesTemplate: WhatsappGetMessagesTemplatesResponse) {
    const { whatsappManageTemplateMessageCurrentIndex } = useWhatsappManageTemplateMessageSelection();
    let templateMessageComponents: WhatsappComponentsArrayType = [];
    const targetIndex = Number(whatsappManageTemplateMessageCurrentIndex);
    if (messagesTemplate?.data && targetIndex >= 0 && targetIndex < messagesTemplate.data.length) {
        templateMessageComponents = messagesTemplate.data[targetIndex].components;
    }
    return {
        templateMessageComponents
    };
}
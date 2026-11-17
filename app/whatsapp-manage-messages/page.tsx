import { getWhatsappPageData } from "@/app/whatsapp-manage-messages/actions";
import { WhatsappManageSendMessagePageProps } from "@/app/whatsapp-manage-messages/types/whatsapp-manage-send-message";
import WhatsappSendMessageForm from "@/ui/whatsapp-send-message-form";

export const instant = false

export default async function WhatsappManageSendMessagePage({ searchParams }: WhatsappManageSendMessagePageProps) {
  const {
    accounts,
    currentAccountIndex,
    messagesTemplate,
    phoneNumbers
  } = await getWhatsappPageData(searchParams)
  return (
    <div className="flex justify-start p-5 m-5 flex-1">
      <h1>Enviar Mensagem</h1>
      <WhatsappSendMessageForm
        whatsappAccountsSelectionCurrentAccountIndex={currentAccountIndex}
        accounts={accounts}
        phoneNumbers={phoneNumbers}
        messagesTemplate={messagesTemplate}
      />
    </div>
  );
}
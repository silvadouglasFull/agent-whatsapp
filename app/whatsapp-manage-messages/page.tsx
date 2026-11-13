import { metaWhatsappGetMessagesTemplates } from "@/app/whatsapp-manage-messages/actions";
import { WhatsappManageSendMessagePageProps } from "@/app/whatsapp-manage-messages/types/whatsapp-manage-send-message-page";
import { metaWhatsappAccountsService } from "@/services/whatsapp-manage-accounts";
import { WhatsappSendMessageForm } from "@/ui/whatsapp-send-message-form";


export default async function WhatsappManageSendMessagePage({ searchParams }: WhatsappManageSendMessagePageProps) {
  const resolvedParams = await searchParams;
  const currentAccountIndex = typeof resolvedParams.account === 'string' ? resolvedParams.account : "0";
  const accountIndexNumber = parseInt(currentAccountIndex, 10) || 0;
  const accounts = await metaWhatsappAccountsService.getOwnedAccounts();
  const safeIndex = accountIndexNumber < accounts.data.length ? accountIndexNumber : 0;
  const selectedAccount = accounts.data[safeIndex];
  const phoneNumbers = await metaWhatsappAccountsService.getWabaPhoneNumbers(selectedAccount.id);
  const messagesTemplate = await metaWhatsappGetMessagesTemplates({
    whatsappBussinessPhoneNumberId: selectedAccount ? selectedAccount.id : ""
  });
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
import { getWhatsappPageData } from "@/app/whatsapp-manage-messages/actions";
import { WhatsappManageSendMessagePageProps } from "@/app/whatsapp-manage-messages/types/whatsapp-manage-send-message";
import WhatsappSendMessageForm from "@/ui/whatsapp-send-message-form";

export const instant = false;

export default async function WhatsappManageSendMessagePage({ searchParams }: WhatsappManageSendMessagePageProps) {
  const {
    accounts,
    currentAccountIndex,
    messagesTemplate,
    phoneNumbers
  } = await getWhatsappPageData(searchParams);

  return (
    <div className="flex flex-col w-full min-h-screen p-6 lg:p-8 bg-neutral-primary">
      <header className="w-full mb-8 pb-4 border-b border-default-medium">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Send Mensage
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Manage and send personalized message templates via the WhatsApp Business API.
        </p>
      </header>
      <main className="w-full flex-1">
        <WhatsappSendMessageForm
          whatsappAccountsSelectionCurrentAccountIndex={currentAccountIndex}
          accounts={accounts}
          phoneNumbers={phoneNumbers}
          messagesTemplate={messagesTemplate}
        />
      </main>
    </div>
  );
}
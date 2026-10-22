import { metaWhatsappAccountsService } from "@/services/manager-accounts";
import { WhatsappAccountsList } from "@ui/whatsapp-accounts-list";
export const instant = false
export default async function ManagerWhatsAppPage() {
  const accounts = await metaWhatsappAccountsService.getOwnedAccounts();
  return (
    <div>
      <h1>Contas do WhatsApp</h1>
      <WhatsappAccountsList accounts={accounts} />
    </div>
  );
}
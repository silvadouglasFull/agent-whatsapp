import { metaWhatsappAccountsService } from "@/services/whatsapp-manage-accounts";
import { WhatsappAccountsList } from "@ui/whatsapp-accounts-list";
export const instant = false
export default async function WhatsappManageAccountsPage() {
  const accounts = await metaWhatsappAccountsService.getOwnedAccounts();
  return (
    <div className="flex justify-start p-5 m-5 flex-1">
      <h1>Contas do WhatsApp</h1>
      <WhatsappAccountsList accounts={accounts} />
    </div>
  );
}
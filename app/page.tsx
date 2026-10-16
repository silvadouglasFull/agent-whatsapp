import { facebookWhatsAppService } from "@/services/whatsapp";
import { WhatsAppForm } from "@ui/whatsapp-form";
export const instant = false
export default async function WhatsAppPage() {
  const accounts = await facebookWhatsAppService.getOwnedAccounts();
  return (
    <div>
      <h1>Contas do WhatsApp</h1>
      <WhatsAppForm accounts={accounts} />
    </div>
  );
}
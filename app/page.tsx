import Link from "next/link";
export const instant = false
export default async function WhatsAppPage() {
  return (
    <div>
      <h1>Contas do WhatsApp</h1>
      <Link href={'/manage-whatsapp-accounts'}>Gerenciar Contas </Link>
    </div>
  );
}
// app/whatsapp/page.tsx
import { facebookWhatsAppService } from "@/services/whatsapp";

export default async function WhatsAppPage() {
  const accounts = await facebookWhatsAppService.getOwnedAccounts();

  return (
    <div>
      <h1>Contas do WhatsApp</h1>
      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label htmlFor="countries" className="block mb-2.5 text-sm font-medium text-heading">Select Wba</label>
          <select id="countries" className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body">
            {accounts.data.length && accounts.data.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} | {account.id}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5 mx-w-sm mx-auto">
          <label htmlFor="message" className="block mb-2.5 text-sm font-medium text-heading">Your message</label>
          <textarea id="message" rows={4}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
            placeholder="Write your thoughts here...">
          </textarea>
        </div>
      </form>
    </div>
  );
}
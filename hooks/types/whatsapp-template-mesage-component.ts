import { WhatsappGetMessagesTemplatesResponse } from "@/services/types/whatsapp-manager-messages";

export type WhatsappComponentsArrayType = WhatsappGetMessagesTemplatesResponse["data"][number]["components"];

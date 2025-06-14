import { IMessage } from "./IMessage";

export interface IChanges {
    messaging_product: 'whatsapp';
    metadata: {
        display_phone_number: string;
        phone_number_id: string;
    };
    contacts: Array<{
        profile: Record<string, any>;
        wa_id: string;
    }>;
    messages: IMessage[];
}
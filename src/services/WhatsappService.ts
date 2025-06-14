import { WhatsappApi } from "../api/WhatsappApi";

export class WhatsappService {
    private whatsappApi;

    constructor() {
        this.whatsappApi = new WhatsappApi();
    }

    async sendTextMessage(to: string, text: string): Promise<void> {
        try {
            await this.whatsappApi.postMeta({
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to,
                type: 'text',
                text: { body: `*${text}*`, preview_url: true },
            });
        } catch (error) {
            console.log(error);
        }
    }

    async typingMessage(idMessage: string): Promise<void> {
        try {
            await this.whatsappApi.postMeta({
                messaging_product: "whatsapp",
                status: "read",
                message_id: idMessage,
                typing_indicator: {
                    type: "text"
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    async readMessage(idMessage: string): Promise<void> {
        try {
            await this.whatsappApi.postMeta({
                messaging_product: "whatsapp",
                status: "read",
                message_id: idMessage
            });
        } catch (error) {
            console.log(error);
        }
    }

}
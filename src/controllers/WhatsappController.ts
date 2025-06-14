import { WhatsappService } from "../services/WhatsappService";
import { OpenAIService } from "../services/OpenAIService";
import { IMessage } from "../interfaces/IMessage";
import { IChanges } from "../interfaces/IChanges";

export class WhatsappController {
    private whatsappService: WhatsappService;
    private openAIService: OpenAIService;
    private supportedMessages: string[] = ['text']

    constructor() {
        this.whatsappService = new WhatsappService();
        this.openAIService = new OpenAIService();
    }

    async handlePayload(payload: any): Promise<void> {
        const changes: IChanges = payload.entry[0].changes[0].value;
        const message: IMessage = changes.messages[0];
        await this.whatsappService.readMessage(message.id);

        try {
            if (!this.supportedMessages.includes(message.type)) {
                await this.whatsappService.sendTextMessage(message.from, 'Desculpe, ainda não consigo responder esse tipo de mensagem. Por favor, envie uma mensagem de texto.');
            }

            const responseIA: string = await this.openAIService.createResponse(message.text.body)
            await this.whatsappService.typingMessage(message.id);
            await this.whatsappService.sendTextMessage(message.from, responseIA);

        } catch (error) {
            console.log('Error processing message:', error);
            await this.whatsappService.sendTextMessage(message.from, 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.');
        }
    }


}
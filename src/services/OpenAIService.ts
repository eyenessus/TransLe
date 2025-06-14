import 'dotenv/config'
import OpenAI from 'openai';
import * as fs from 'fs/promises';
import * as path from 'path';
import { PayloadMachine } from '../interfaces/IPayloadMachine';

export class OpenAIService extends OpenAI {
    
    constructor() {
        super({ apiKey: process.env.OPENAI_API_KEY });
    }

    async createResponse(prompt: string): Promise<string> {
        const instructionsPath: string = path.join(__dirname, '..', 'model', 'prompt.txt');
        const instructions: string = await fs.readFile(instructionsPath, 'utf-8');

        const payloadMachine: PayloadMachine = {
            model: 'gpt-4o',
            instructions,
            input: this.cleanText(prompt),
            temperature: 0.7,
            max_output_tokens: 100,
        };

        const response: string = (await this.responses.create(payloadMachine)).output_text
        return response;
    }

    private cleanText(text: string): string {
        return text.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }
}
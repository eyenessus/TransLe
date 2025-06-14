export interface PayloadMachine {
    model: string;
    instructions: string;
    input: string;
    temperature: number;
    max_output_tokens: number;
}
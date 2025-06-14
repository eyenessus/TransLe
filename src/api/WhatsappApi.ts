import axios, { AxiosError } from 'axios';
import 'dotenv/config';

type AxiosInstance = ReturnType<typeof axios.create>;

export class WhatsappApi {
  private axiosMeta: AxiosInstance;

  constructor() {
    this.axiosMeta = axios.create({
      baseURL: `https://graph.facebook.com/${process.env.WHATSAPP_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
      }
    });
  }

  async postMeta(data: object): Promise<any> {
    try {
      return await this.axiosMeta.post('/messages', data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(`Error in WhatsappApi: ${error.response?.data.error.message}`);
      }
      throw error;
    }
  }
}

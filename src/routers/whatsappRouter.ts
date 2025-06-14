import { Router,Request, Response } from 'express';
import { authenticateApp, isRequestSignatureValid } from '../helpers/WhatsappHelper';
import { WhatsappController } from '../controllers/WhatsappController';

export const whatsappRouter: Router = Router();
const whatsappController = new WhatsappController();

whatsappRouter.get('/', authenticateApp);
whatsappRouter.use('/', async (req: Request, res: Response, next: Function) => {
    try {
        if (!isRequestSignatureValid(req)) {
            res.status(432).send('Invalid request');
            return;
        }
        next();
    } catch (error) {
        console.error('Error in signature validation:', error);
        res.status(500).send('Internal Server Error');
    }
});

whatsappRouter.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const messageReceive = await req.body.entry?.[0]?.changes[0]?.value
        const message = messageReceive?.messages?.[0]?.type;
        if (message) {
            whatsappController.handlePayload(req.body);
        }
        res.status(200).send();
    } catch (error) {
        res.status(500).send();
    }
});

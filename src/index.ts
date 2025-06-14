import {  Request, Response } from "express";
import express = require('express');
import bodyParser from "body-parser";
import { whatsappRouter } from "./routers/whatsappRouter";
const app: express.Application = express();
const PORT: number = Number(process.env.PORT) || 8080;

app.use(bodyParser.json({
    verify: (req: any, _res: any, buf: Buffer) => {
        req.rawBody = buf.toString();
    }
}));

app.use(express.json());

app.get('/', (_req: Request, res: Response): void => {
    res.status(200).send('API is running');
})

app.use('/whatsapp', whatsappRouter);


app.listen(PORT, (): void => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;


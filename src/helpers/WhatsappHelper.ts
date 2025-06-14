import crypto from "crypto";
import 'dotenv/config'
import { NextFunction, Request, Response } from "express";

declare module 'express-serve-static-core' {
    interface Request {
        rawBody: string;
    }
}

export function isRequestSignatureValid(req: Request) {
        if (!process.env.WHATSAPP_SECRET) {
            return true;
        }
        
        let signatureHeader: string |undefined= req.get("x-hub-signature-256");
        if (!signatureHeader) {
            console.error("Error: Request Signature Header is missing");
            return false;
        }
        let signatureBuffer: Buffer = Buffer.from(signatureHeader.replace("sha256=", ""), "utf-8");
        
        if (!signatureBuffer) {
            return false;
        }
        
        let hmac: crypto.Hmac = crypto.createHmac("sha256", process.env.WHATSAPP_SECRET); 
        let digestString: string = hmac.update(req.rawBody).digest('hex');
        let digestBuffer: Buffer = Buffer.from(digestString, "utf-8");

        if (!crypto.timingSafeEqual(digestBuffer, signatureBuffer)) {
            console.error("Error: Request Signature did not match");
            return false;
        }
        return true;
    }   

export function authenticateApp(req: Request, res: Response, next: NextFunction) {
    if (req.method === "GET" && req.query["hub.verify_token"] === process.env.WHATSAPP_VERIFY_TOKEN) {
        res.status(200).send(req.query["hub.challenge"]);
    } else if (req.method === "POST") {
        next();
    } else {
        res.json({ error: 'Not found resource, Try again!' }).status(418);
    }
};
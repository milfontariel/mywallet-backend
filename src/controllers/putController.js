import { stripHtml } from "string-strip-html";
import db from "../db.js";
import dayjs from "dayjs";

export default async function put(req, res) {
    try {
        const data = req.body;
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');
        if(!token){
            return res.sendStatus(401);
        }
        const userId = await db.collection('sessions').findOne({token: token});
        if (!userId){
            return res.status(401).send("Sessão não está ativa.");
        }
        data.value = stripHtml(data.value).result.trim();
        data.description = stripHtml(data.description).result.trim();
        const operation = req.url.replace('/', '');
        
        await db.collection('summary').insertOne({
            date: dayjs().format('DD/MM'),
            description: data.description,
            type: operation,
            userId: userId.userId,
            value: data.value
        });
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
import { stripHtml } from "string-strip-html";
import db from "../db.js";
import dayjs from "dayjs";

export default async function put(req, res) {
    try {
        const data = req.body;
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');
        if(!token){
            return res.status(401).send("Requisitos incompletos.");
        }
        const userId = await db.collection('sessions').findOne({token: token});
        if (!userId){
            return res.status(401).send("Sessão não está ativa. Faça login novamente!");
        }
        data.value = stripHtml(data.value).result.trim();
        if(data.value.length < 5){
            for(let i = data.value.length; i < 5; i++){

                if(data.value.length === 1){
                    data.value += ',00';
                    break;
                }
                if(data.value.length === 3){
                    data.value += '0';
                    break;
                }
            }
        }
        data.description = stripHtml(data.description).result.trim();
        const operation = req.url.replace('/', '');
        
        await db.collection('summary').insertOne({
            date: dayjs().format('DD/MM'),
            description: data.description,
            type: operation,
            userId: userId.userId,
            value: data.value
        });
        res.status(201).send("Adicionado");
    } catch (error) {
        res.status(500).send("Erro interno do servidor");
    }
}
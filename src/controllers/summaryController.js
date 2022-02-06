import { ObjectId } from "mongodb";
import db from "../db.js";

export async function summaryGet(req, res){
    try {
        const {authorization} = req.headers;
        const token = authorization?.replace('Bearer ', '');
        const { userId } = await db.collection('sessions').findOne({token: token});
        const items = await db.collection('summary').find({userId: userId}).toArray();
        res.send(items);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function deleteSummaryItem(req, res){
    try {
        const {id} = req.params;
        const {authorization} = req.headers;
        const token = authorization?.replace('Bearer ', '');
        if(!token){
            return res.sendStatus(401);
        }
        const sessions = await db.collection('sessions').findOne({token: token});
        if (!sessions){
            return res.status(401).send("Sessão não está ativa.");
        }
        const summary = await db.collection('summary').findOne({_id: ObjectId(id)});
        if(sessions.userId.equals(summary.userId)){
            await db.collection('summary').deleteOne({_id: ObjectId(id)});
            res.status(200).send("Deletado com sucesso.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
import { v4 as uuid } from "uuid";
import bcrypt from 'bcrypt';
import db from "../db.js";

export async function login(req, res) {
    const { email, password } = req.body;

    const user = await db.collection('users').findOne({ email: email })

    if (user && bcrypt.compareSync(password, user.password)) {
        const validateSession = await db.collection('sessions').findOne({ userId: user._id });
        if (validateSession) {
            return res.send({
                token: validateSession.token,
                name: user.name
            });
        }
        const token = uuid();
        await db.collection('sessions').insertOne({ token, userId: user._id });
        res.send({
            token,
            name: user.name
        });
    } else {
        res.status(401).send("E-mail ou senha incorretos.");
    }
}

export async function logout(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send("Sessão não está ativa.");
    }
    const session = await db.collection('sessions').findOne({ token: token});
    if(session){
        await db.collection('sessions').deleteOne({token: token});
        res.sendStatus(200);
    }
}
import { v4 as uuid } from "uuid";
import bcrypt from 'bcrypt';
import db from "../db.js";

export async function login(req, res) {
    const { email, password } = req.body;

    const user = await db.collection('users').findOne({email: email})

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = uuid();
        await db.collection('sessions').insertOne({token, userId: user._id});
        res.send(token);
    } else {
        res.sendStatus(401);
    }
}
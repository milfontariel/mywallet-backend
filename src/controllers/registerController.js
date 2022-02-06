import db from '../db.js';
import bcrypt from 'bcrypt';

export async function registerUser(req, res) {
    try {
        const newUser = req.body;

        const user = await db.collection('users').findOne({ email: newUser.email });
        if (user) {
            res.status(409).send("Usuário já cadastrado");
        } else {
            delete newUser.repeatPassword;
            const passwordHash = bcrypt.hashSync(newUser.password, 10);
            await db.collection('users').insertOne({
                ...newUser,
                password: passwordHash
            });
            res.status(201).send("Conta criada");
        }
    } catch (error) {
        res.status(500).send(error);
    }
}
import loginSchema from "../schemas/loginSchema.js";

export default function validateLoginSchemaMiddleware(req, res, next) {
    const validation = loginSchema.validate(req.body);

    if(validation.error){
        return res.sendStatus(422);
    }
    next();
}
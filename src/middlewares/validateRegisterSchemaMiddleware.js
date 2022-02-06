import registerSchema from "../schemas/registerSchema.js";

export default function validateRegisterSchemaMiddleware(req, res, next){
    const validation = registerSchema.validate(req.body);
    
    if(validation.error){
        return res.status(422).send("Campos preenchidos incorretamente.");
    }
    next();
}
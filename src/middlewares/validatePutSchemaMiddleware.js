import putSchema from "../schemas/putSchema.js";

export default function validatePutSchemaMiddleware(req, res, next){
    const validation = putSchema.validate(req.body);
    if(validation.error){
        return res.status(422).send('Insira apenas números no campo "valor"');
    }
    next();
}
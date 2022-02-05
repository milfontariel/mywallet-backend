import Joi from "joi";

const putSchema = Joi.object({
    value: Joi.number().required(),
    description: Joi.string().required()
})
export default putSchema;
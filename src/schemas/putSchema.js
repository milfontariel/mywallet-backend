import Joi from "joi";

const putSchema = Joi.object({
    value: Joi.string().required(),
    description: Joi.string().required()
})
export default putSchema;
import { Router } from "express";
import validateRegisterSchemaMiddleware from "../middlewares/validateRegisterSchemaMiddleware.js";
import { registerUser } from "../controllers/registerController.js";

const registerRouter = Router();
registerRouter.post('/register', validateRegisterSchemaMiddleware, registerUser);
export default registerRouter;
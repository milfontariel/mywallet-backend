import { Router } from "express";
import validateLoginSchemaMiddleware from "../middlewares/validateLoginSchemaMiddleware.js";
import { login } from "../controllers/loginController.js";

const loginRouter = Router();
loginRouter.post('/', validateLoginSchemaMiddleware, login);
export default loginRouter;
import { Router } from "express";
import validateLoginSchemaMiddleware from "../middlewares/validateLoginSchemaMiddleware.js";
import { login, logout } from "../controllers/loginController.js";

const loginRouter = Router();
loginRouter.post('/', validateLoginSchemaMiddleware, login);
loginRouter.delete('/', logout);
export default loginRouter;
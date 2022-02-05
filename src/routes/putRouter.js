import { Router } from "express";
import validatePutSchemaMiddleware from "../middlewares/validatePutSchemaMiddleware.js";
import put from "../controllers/putController.js";
const putRouter = Router();
putRouter.post('/input', validatePutSchemaMiddleware, put);
putRouter.post('/output', validatePutSchemaMiddleware, put);
export default putRouter;
import { Router } from "express";
import registerRouter from "./registerRouter.js";
import loginRouter from "./loginRouter.js";

const router = Router();
router.use(registerRouter);
router.use(loginRouter);
export default router;
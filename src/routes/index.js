import { Router } from "express";
import registerRouter from "./registerRouter.js";
import loginRouter from "./loginRouter.js";
import putRouter from "./putRouter.js";

const router = Router();
router.use(registerRouter);
router.use(loginRouter);
router.use(putRouter);
export default router;
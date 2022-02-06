import { Router } from "express";
import { summaryGet, deleteSummaryItem } from "../controllers/summaryController.js";

const summaryRouter = Router();
summaryRouter.get('/summary-history', summaryGet);
summaryRouter.delete('/summary-history/:id', deleteSummaryItem);
export default summaryRouter;
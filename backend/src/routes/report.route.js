import { Router } from "express";
import {createReport} from "../controller/report.controller.js"
import { authenticate } from "../middlewares/authMiddlewares.js";

const router = Router()

router.post("/report", authenticate, createReport)

export default router;
import { Router } from "express";
import { getMetrics } from "../controller/metrics.controller.js";
import { authenticate} from "../middlewares/authMiddlewares.js"

const router = Router()

router.get('/dashboard/metrics',authenticate, getMetrics)

export default router
import { Router } from "express";
import { getMetrics } from "../controller/metrics.controller.js";
import { authenticate, authorizeRoles} from "../middlewares/authMiddlewares.js"

const router = Router()

router.get('/dashboard/metrics',authenticate, authorizeRoles, getMetrics)

export default router
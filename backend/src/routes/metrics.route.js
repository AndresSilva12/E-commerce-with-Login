import { Router } from "express";
import { getMetrics } from "../controller/metrics.controller.js";

const router = Router()

router.get('/dashboard/metrics', getMetrics)

export default router
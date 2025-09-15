import { Router } from "express";
import {createReport} from "../controller/report.controller.js"
import { authenticate, authorizeRoles } from "../middlewares/authMiddlewares.js";

const router = Router()

router.post("/report", authenticate, authorizeRoles, createReport)

export default router;
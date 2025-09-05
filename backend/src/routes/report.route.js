import { Router } from "express";
import {createReport} from "../controller/report.controller.js"

const router = Router()

router.post("/report", createReport)

export default router;
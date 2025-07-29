import { Router } from "express";
import { createNewSale, deleteSale, getAllSales } from "../controller/sales.controller.js";
import { validateNewSale } from "../middlewares/salesMiddlewares.js";

const router = Router()

router.post('/sales', validateNewSale, createNewSale)

router.get('/sales', getAllSales)

router.delete('/sales/:id', deleteSale)
export default router
import { Router } from "express";
import { createNewSale, deleteSale, getAllSales } from "../controller/sales.controller.js";

const router = Router()

router.post('/sales', createNewSale)

router.get('/sales', getAllSales)

router.delete('/sales/:id', deleteSale)
export default router
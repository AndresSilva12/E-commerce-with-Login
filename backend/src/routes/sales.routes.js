import { Router } from "express";
import { createNewSale, deleteSale, getAllSales } from "../controller/sales.controller.js";
import { validateNewSale, validateSaleExist } from "../middlewares/salesMiddlewares.js";
import { authenticate } from "../middlewares/authMiddlewares.js";

const router = Router()

router.post('/sales', authenticate, validateNewSale, createNewSale)

router.get('/sales', getAllSales)

router.delete('/sales/:id',validateSaleExist, deleteSale)
export default router
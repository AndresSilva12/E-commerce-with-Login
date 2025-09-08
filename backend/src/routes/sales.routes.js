import { Router } from "express";
import { createNewSale, deleteSale, getAllSales, updateSale } from "../controller/sales.controller.js";
import { validateNewSale, validateSaleExist } from "../middlewares/salesMiddlewares.js";
import { authenticate } from "../middlewares/authMiddlewares.js";

const router = Router()

router.post('/sales', authenticate, validateNewSale, createNewSale)

router.get('/sales', getAllSales)

router.delete('/sales/:id',validateSaleExist, deleteSale)

router.put('/sales/:id', validateSaleExist, updateSale)
export default router
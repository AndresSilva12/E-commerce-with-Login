import { Router } from "express";
import { createCategory, getAllCategories, getUniqueCategory } from "../controller/categories.controller.js";
import { validateCreateCategory } from "../middlewares/categoryMiddleware.js";

const router = Router()

router.get('/category', getAllCategories)
router.get('/category/:id', getUniqueCategory)
router.post('/category', validateCreateCategory, createCategory)

export default router
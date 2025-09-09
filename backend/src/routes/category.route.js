import { Router } from "express";
import { createCategory, getAllCategories, getUniqueCategory, updateCategory } from "../controller/categories.controller.js";
import { validateCategoryExist, validateCreateCategory, validateUpdateCategory } from "../middlewares/categoryMiddleware.js";

const router = Router()

router.get('/category', getAllCategories)
router.get('/category/:id', getUniqueCategory)
router.post('/category', validateCreateCategory, createCategory)
router.put('/category/:id', validateCategoryExist, validateUpdateCategory, updateCategory)

export default router
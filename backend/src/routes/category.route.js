import { Router } from "express";
import { createCategory, getAllCategories, updateCategory } from "../controller/categories.controller.js";
import { validateCategoryExist, validateCreateCategory, validateUpdateCategory } from "../middlewares/categoryMiddleware.js";
import {authenticate} from "../middlewares/authMiddlewares.js"

const router = Router()

router.get('/category', authenticate, getAllCategories)
router.post('/category',authenticate, validateCreateCategory, createCategory)
router.put('/category/:id',authenticate, validateCategoryExist, validateUpdateCategory, updateCategory)

export default router
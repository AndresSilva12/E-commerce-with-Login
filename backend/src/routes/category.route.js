import { Router } from "express";
import { createCategory, getAllCategories, updateCategory } from "../controller/categories.controller.js";
import { validateCategoryExist, validateCreateCategory, validateUpdateCategory } from "../middlewares/categoryMiddleware.js";
import {authenticate, authorizeRoles} from "../middlewares/authMiddlewares.js"

const router = Router()

router.get('/category', authenticate, getAllCategories)
router.post('/category',authenticate, authorizeRoles, validateCreateCategory, createCategory)
router.put('/category/:id',authenticate, authorizeRoles, validateCategoryExist, validateUpdateCategory, updateCategory)

export default router
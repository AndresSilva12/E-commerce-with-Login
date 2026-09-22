import { Router } from "express";
import { createCategory, getAllCategories, updateCategory, deleteCategory } from "../controller/categories.controller.js";
import { validateCategoryExist, validateCreateCategory, validateUpdateCategory, validateCategoryHasNoProducts } from "../middlewares/categoryMiddleware.js";
import {authenticate, authorizeRoles} from "../middlewares/authMiddlewares.js"

const router = Router()

router.get('/category', authenticate, getAllCategories)
router.post('/category',authenticate, authorizeRoles, validateCreateCategory, createCategory)
router.put('/category/:id',authenticate, authorizeRoles, validateCategoryExist, validateUpdateCategory, updateCategory)
router.delete('/category/:id',authenticate, authorizeRoles, validateCategoryExist, validateCategoryHasNoProducts, deleteCategory)

export default router
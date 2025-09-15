import { Router } from "express";
import { createProduct, getOneProduct, getProducts, updateProduct } from "../controller/products.controller.js";
import { validateProduct, validateProductExist, validateUpdateProduct } from "../middlewares/productsMiddlewares.js";
import { authenticate, authorizeRoles } from "../middlewares/authMiddlewares.js"

const router = Router()

router.get('/products', authenticate, getProducts)

router.get('/products/:id', authenticate, authorizeRoles, validateProductExist, getOneProduct)

router.post('/products', authenticate, authorizeRoles, validateProduct ,createProduct)

router.put('/products/:id', authenticate, authorizeRoles, validateProductExist, validateUpdateProduct, updateProduct)

export default router
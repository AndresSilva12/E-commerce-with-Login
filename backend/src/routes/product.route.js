import { Router } from "express";
import { createProduct, getProducts, updateProduct } from "../controller/products.controller.js";
import { validateProduct, validateProductExist, validateUpdateProduct } from "../middlewares/productsMiddlewares.js";
import { authenticate } from "../middlewares/authMiddlewares.js"

const router = Router()

router.get('/products', authenticate, getProducts)

router.post('/products', authenticate, validateProduct ,createProduct)

router.put('/products/:id', authenticate, validateProductExist, validateUpdateProduct, updateProduct)

export default router
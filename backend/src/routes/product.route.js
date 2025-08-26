import { Router } from "express";
import { createProduct, deleteProduct, getProducts, getOneProduct, updateProduct } from "../controller/products.controller.js";
import { validateProduct, validateProductExist, validateUpdateProduct } from "../middlewares/productsMiddlewares.js";

const router = Router()

router.get('/products', getProducts)

router.post('/products', validateProduct ,createProduct)

router.get('/products/:id',validateProductExist, getOneProduct)

router.delete('/products/:id',validateProductExist ,deleteProduct)

router.put('/products/:id',validateProductExist, validateUpdateProduct, updateProduct)

export default router
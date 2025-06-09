import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from "../controller/products.controller.js";
import { validateProduct, validateProductExist, validateUpdateProduct } from "../middlewares/productsMiddlewares.js";

const router = Router()

router.get('/products', getAllProducts)

router.post('/products', validateProduct ,createProduct)

router.get('/products/:id',validateProductExist, getOneProduct)

router.delete('/products/:id',validateProductExist ,deleteProduct)

router.put('/products/:id',validateProductExist, validateUpdateProduct, updateProduct)

export default router
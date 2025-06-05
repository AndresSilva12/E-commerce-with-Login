import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from "../controller/products.controller.js";

const router = Router()

router.get('/products', getAllProducts)

router.post('/products', createProduct)

router.get('/products/:id', getOneProduct)

router.delete('/products/:id', deleteProduct)

router.put('/products/:id', updateProduct)

export default router
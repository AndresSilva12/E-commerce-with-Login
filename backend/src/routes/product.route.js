import { Router } from "express";
import prisma from "../db.js";

const router = Router()

router.get('/products', async(req, res) => {
    const products = await prisma.products.findMany()
    return res.json(products)
})

router.post('/products', async(req, res) => {
    const {code, name, description, price, brand} = req.body
    const newProduct = await prisma.products.create({
        data: {
            code: code,
            name: name,
            description: description,
            price: price,
            brand: brand
        }
    })
    return res.json(newProduct)
})

router.get('/products/:id', async(req, res) => {
    const id = req.params.id
    const product = await prisma.products.findUnique({
        where: {
            id: id
        }
    })
    return res.json(product)
})

router.delete('/products/:id', async(req, res) => {
    const id = req.params.id
    const productDeleted = await prisma.products.delete({
        where: {
            id: id
        }
    })
    return res.json(productDeleted)
})

router.put('/products/:id', async(req, res)=> {
    const id = req.params.id
    const productUpdated = await prisma.products.update({
        where: {
            id: id
        },
        data: req.body
    })
    return res.json(productUpdated)
})


export default router
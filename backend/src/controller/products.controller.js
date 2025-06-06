import prisma from "../db.js";

export const createProduct = async(req, res) => {
    try{
        /* const {code, name, description, price, brand} = req.body */
        const newProduct = await prisma.products.create({
            data: req.body
        })
        return res.json(newProduct)
    }
    catch (error){
        console.log(error)
        return res.status(500).json({error: "Error interno al crear el producto"})
    }
}

export const getAllProducts = async(req, res) => {
    try{
        const products = await prisma.products.findMany()
        return res.json(products)
    }
    catch (error){
        console.log(error)
        return res.status(500).json({error: "Error interno al traer los productos"})
    }
}

export const getOneProduct = async(req, res) => {
    try {
        const id = req.params.id
        const product = await prisma.products.findUnique({
            where: {
                id: id
            }
        })
        return res.json(product)
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error interno al traer el producto"})
    }
}

export const deleteProduct = async(req, res) => {
    try {
        const id = req.params.id
        const productDeleted = await prisma.products.delete({
            where: {
                id: id
            }
        })
        return res.json(productDeleted)
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error interno al eliminar el producto"})
    }
}

export const updateProduct = async(req, res) => {
    try {
        const id = req.params.id
        const productUpdated = await prisma.products.update({
            where: {
                id: id
            },
            data: req.body
        })
        return res.json(productUpdated)
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error interno al actualizar el producto"})   
    }
}
import { idCuidSchema, productSchema, updateProductSchema } from "../../../validation/productSchema.js"
import prisma from "../db.js" 

export const validateProduct = async(req, res, next) => {
    try{
        const parsed = productSchema.safeParse(req.body)
        if (!parsed.success) {
            const errors = {}
            for (const error of parsed.error.errors) {
                errors[error.path] = error.message
            }
            return res.status(400).json({errors})
        }
        req.body = parsed.data
        next()
    }
    catch (error){
        console.log(error)
    }
}

export const validateUpdateProduct = async(req, res, next) => {
    try {
        const productSelected = req.product

        const parsed = updateProductSchema.safeParse(req.body)
        if (!parsed.success) {
            const errors = {}
            for (const err of parsed.error.errors) {
                errors[err.path] = err.message
            }

            return res.status(400).json({errors})
        }

        req.body = parsed.data
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error interno del servidor"})
    }
}

export const validateProductExist = async(req, res, next) => {
    try {
        const idParsed = idCuidSchema.safeParse(req.params.id)
        if (!idParsed.success) return res.status(400).json({error: "ID de producto no válido"})
        
        const product = await prisma.products.findUnique({
            where: {
                id: idParsed.data
            }
        })

        if (!product) return res.status(404).json({error: "El producto no existe"})

        req.product = product

        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error interno durante la operacion"})
    }
}
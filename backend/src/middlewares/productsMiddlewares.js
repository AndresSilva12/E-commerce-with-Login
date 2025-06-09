import { error } from "zod/v4/locales/ar.js"
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
        const parsed = updateProductSchema.safeParse(req.body)
        if (!parsed.success) {
            const errors = {}
            for (const err of parsed.error.errors) {
                errors[err.path] = err.message
            }

            return res.status(400).json({errors})
        }
        const {code} = parsed.data
        const parsedId = idCuidSchema.safeParse(req.params.id)
        if (!parsedId.success) return res.status(400).json({error: "El id seleccionado no es válido", parsedId})
        const product = await prisma.products.findUnique({
            where:{
                id: parsedId.data
            }
        })

        if (!product) return res.status(404).json({error: "El producto no existe"})

        if (code){
            if (code !== product.code){
                const codeExist = await prisma.products.findUnique({
                    where: {
                        code: code
                    }
                })
                if (codeExist) return res.status(400).json({error: "El codigo ya está en uso"})
            }
        }

        req.body = parsed.data
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error interno al validar actualizacion de producto"})
    }
}
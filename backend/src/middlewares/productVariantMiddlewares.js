import { idVariantSchema, updateVariantSchema, variantSchema } from "../../../validation/productVariantsSchema.js"
import prisma from "../db.js"

export const validateCreateVariant = async(req, res, next) => {
    try {
        const parsed = variantSchema.safeParse(req.body)
        if (!parsed.success){
            const errors = {}
            for (const err of parsed.error.errors) {
                errors[err.path] = err.message
            }
            return res.status(400).json(errors)
        }

        req.body = parsed.data
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error interno durante el proceso"})
    }
}

export const validateVariantExist = async(req, res, next) => {
    try {
        const idParsed = idVariantSchema.safeParse(req.params.id)
        if (!idParsed.success) return res.status(400).json(idParsed.error.message)
        const variant = await prisma.productVariant.findUnique({
            where:{
                id: idParsed.data
            }
        })
        if(!variant) return res.status(404).json({error: "La variante no existe"})
        req.variant = variant
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error interno durante el proceso"})
    }
}

export const validateUpdateVariant = async(req, res, next) => {
    try {
        const parsed = updateVariantSchema.safeParse(req.body)
        if (!parsed.success) {
            const errors = {}
            for (const err of parsed.error.errors){
                errors[err.path] = err.message
            }
            return res.status(400).json(errors)
        }
        
        req.body= parsed.data
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error interno durante el proceso"})
    }
}
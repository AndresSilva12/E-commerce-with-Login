import { idCuidSchema, productSchema, updateProductSchema } from "../../../validation/productSchema.js"
import prisma from "../db.js" 

export const validateProduct = async(req, res, next) => {
    try{
        const parsed = productSchema.safeParse(req.body)
        const errors = {}
        if (!parsed.success) {
            for (const error of parsed.error.errors) {
                errors[error.path] = error.message
            }
            return res.status(400).json({errors})
        }
        const {name, brand, variants} = parsed.data
        const errorsVariants = {}
        const productExist = await prisma.products.findFirst({
            where:{
                name: name,
                brand: brand
            }
        })
        if (productExist) errors.brand = "Ya existe un producto con mismo nombre y marca"

        for(const variant of variants){
            const variantExist = await prisma.productVariant.findUnique({
                where: {
                    code: variant.code
                }
            })
            if (variantExist) errorsVariants[variantExist.code] = "Ya existe una variante con ese código"
        }
        if (Object.keys(errorsVariants).length > 0) errors.variants = errorsVariants
        if (Object.keys(errors).length > 0) return res.status(400).json({errors})

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
        const errors = {}

        const parsed = updateProductSchema.safeParse(req.body)
        if (!parsed.success) {
            const errors = {}
            for (const err of parsed.error.errors) {
                errors[err.path] = err.message
            }

            return res.status(400).json({errors})
        }
        
        const {name, brand, variants} = parsed.data
        const errorsVariants = {}
        if (name && brand){
            if (name !== productSelected.name && brand !== productSelected.brand){
                const productExist = await prisma.products.findFirst({
                    where:{
                        name: name,
                        brand: brand
                    }
                })
                if (productExist) errors.brand = "Ya existe un producto con mismo nombre y marca"
            }

        }

        if (variants){
            for(const variant of variants){
                const variantExist = await prisma.productVariant.findUnique({
                    where: {
                        code: variant.code
                    }
                })
                if (variantExist && variantExist.id !== variant.id) errorsVariants[variantExist.code] = "Ya existe una variante con ese código"
            }


        }

        if (Object.keys(errorsVariants).length > 0) errors.variants = errorsVariants
        if (Object.keys(errors).length > 0) return res.status(400).json({errors})

        req.body = parsed.data
        next()
    } catch (error) {
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
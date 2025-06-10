import { variantSchema } from "../../../validation/productVariantsSchema.js"

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
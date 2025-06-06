import { productSchema } from "../../../validation/productSchema.js"

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
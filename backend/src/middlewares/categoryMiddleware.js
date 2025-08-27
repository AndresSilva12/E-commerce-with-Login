import {categorySchema} from "../../../validation/categorySchema.js"
import prisma from "../db.js"

export const validateCreateCategory = async (req, res, next) => {
    try {
        const parsed = categorySchema.safeParse(req.body)
        const errors = {}
        if (!parsed.success){
            for (const error of parsed.error.errors){
                errors[error.path] = error.message
            }
            return res.status(400).json({errors})
        }
        const {name} = parsed.data
        const categoryExist = await prisma.category.findFirst({
            where:{
                name: name
            }
        })
        if (categoryExist) return res.status(400).json({error: `La categoría ${name} ya existe`})

        req.body = parsed.data
        next()
    } catch (error) {
        console.log(error)
    }
}
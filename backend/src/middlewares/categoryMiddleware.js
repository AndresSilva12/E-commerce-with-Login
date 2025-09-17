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
        if (categoryExist) return res.status(400).json({errors: {name: `La categoría ya existe`}})

        req.body = parsed.data
        next()
    } catch (error) {
        return res.status(500).json({error: "Error interno del servidor"})
    }
}

export const validateCategoryExist = async (req, res, next) => {
    try {
        const id = req.params.id
        const categoryExist = await prisma.category.findFirst({
            where: {
                id: id
            }
        })
        if(!categoryExist) return res.status(400).json({error: "El id no corresponde a ninguna categoría"})

        req.category = categoryExist
        next()
    } catch (error) {
        return res.status(500).json({error: "Error interno del servidor"})
    }
}

export const validateUpdateCategory = async(req, res, next) => {
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
        if (categoryExist && categoryExist.id !== req.category.id) return res.status(400).json({errors: {name: `La categoría ya existe`}})

        req.body = parsed.data
        next()
    } catch (error) {
        return res.status(500).json({error: "Error interno del servidor"})
    }
}
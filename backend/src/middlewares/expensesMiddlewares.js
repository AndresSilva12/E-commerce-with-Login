import { expensesSchema, updateExpensesSchema } from "../../../validation/expensesSchema.js";
import prisma from "../db.js";

export const validateCreateExpense = (req, res, next) => {
    try{
        const parsed = expensesSchema.safeParse(req.body)
        const errors = {}
        if (!parsed.success){
            for (const error of parsed.error.errors){
                errors[error.path] = error.message
            }
            return res.status(400).json({errors})
        }

        req.body = parsed.data
        next()
    } catch (error) {
        return res.status(500).json({error: "Error interno del servidor"})
    }
}

export const validateUpdateExpense = (req, res, next) => {
    try {
        const parsed = updateExpensesSchema.safeParse(req.body)
        const errors = {}
        if (!parsed.success){
            for (const error of parsed.error.errors){
                errors[error.path] = error.message
            }
            return res.status(400).json({errors})
        }

        req.body = parsed.data
        next()
    } catch (error) {
        return res.status(500).json({error: "Error interno del servidor"})
    }
}

export const validateExpenseExist = async(req, res, next) => {
    try {
        const {id} = req.params
        const idExist = await prisma.expenses.findUnique({where: id})

        if (!idExist) return res.status(400).json({error: "El gasto seleccionado no existe"})

        next()
    } catch (error) {
        return res.status(500).json({error: "Error interno del servidor"})
    }
}
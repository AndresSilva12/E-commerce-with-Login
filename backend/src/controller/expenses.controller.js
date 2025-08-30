import { date } from "zod/v4"
import prisma from "../db.js"

export const getAllExpenses = async(req, res) => {
    try {
        const year = Number(req.query.year)
        const month = Number(req.query.month)
        if (!year || !month) return res.status(400).json({error: "Debe ingresar el mes y año de los gastos que desea ver"})
        const expenses = await prisma.expenses.findMany({
            where: {
                date:{
                    gte: new Date(year, month -1, 1),
                    lte: new Date (year, month, 0)
                }
            }
        })

        const total = await prisma.expenses.aggregate({
            _sum: {
                amount: true
            },
            where: {
                date:{
                    gte: new Date(year, month -1, 1),
                    lte: new Date(year, month , 0)
                }
            }
        })
        return res.json({expenses: expenses, total: total._sum.amount})
    } catch (error) {
        console.log(error)
    }
}

export const createNewExpense = async(req, res) => {
    try {
        const newExpense = await prisma.expenses.create({
            data: req.body
        })
        return res.json(newExpense)
    } catch (error) {
        console.log(error)
    }
}

export const deleteExpense = async(req, res) => {
    try {
        const expenseDeleted = await prisma.expenses.delete({
            where: {
                id: req.params.id
            }
        })
        return res.json(expenseDeleted)
    } catch (error) {
        console.log(error)
    }
}

export const updateExpense = async(req, res) => {
    try {
        const expenseUpdated = await prisma.expenses.update({
            where:{
                id: req.params.id
            },
            data:{
                name: req.body.name,
                amount: req.body.amount
            }
        })
        res.json(expenseUpdated)
    } catch (error) {
        console.log(error)
    }
}
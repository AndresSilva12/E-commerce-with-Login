import { Router } from "express";
import { createNewExpense, getAllExpenses, deleteExpense, updateExpense } from "../controller/expenses.controller.js";
import { validateCreateExpense, validateUpdateExpense, validateExpenseExist } from "../middlewares/expensesMiddlewares.js";

const router = Router()

router.get('/expenses', getAllExpenses)
router.post('/expenses', validateCreateExpense, createNewExpense)
router.delete('/expenses/:id', validateExpenseExist, deleteExpense)
router.put('/expenses/:id', validateExpenseExist, validateUpdateExpense, updateExpense)

export default router;
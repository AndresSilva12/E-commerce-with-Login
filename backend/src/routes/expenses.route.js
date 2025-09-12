import { Router } from "express";
import { createNewExpense, getAllExpenses, deleteExpense, updateExpense } from "../controller/expenses.controller.js";
import { validateCreateExpense, validateUpdateExpense, validateExpenseExist } from "../middlewares/expensesMiddlewares.js";
import { authenticate } from "../middlewares/authMiddlewares.js"

const router = Router()

router.get('/expenses', authenticate, getAllExpenses)
router.post('/expenses', authenticate, validateCreateExpense, createNewExpense)
router.delete('/expenses/:id', authenticate, validateExpenseExist, deleteExpense)
router.put('/expenses/:id', authenticate, validateExpenseExist, validateUpdateExpense, updateExpense)

export default router;
import { Router } from "express";
import { createNewExpense, getAllExpenses, deleteExpense, updateExpense } from "../controller/expenses.controller.js";
import { validateCreateExpense, validateUpdateExpense, validateExpenseExist } from "../middlewares/expensesMiddlewares.js";
import { authenticate, authorizeRoles } from "../middlewares/authMiddlewares.js"

const router = Router()

router.get('/expenses', authenticate, authorizeRoles, getAllExpenses)
router.post('/expenses', authenticate, authorizeRoles, validateCreateExpense, createNewExpense)
router.delete('/expenses/:id', authenticate, authorizeRoles, validateExpenseExist, deleteExpense)
router.put('/expenses/:id', authenticate, authorizeRoles, validateExpenseExist, validateUpdateExpense, updateExpense)

export default router;
import { Router } from "express";
import { createNewExpense, getAllExpenses, deleteExpense, updateExpense } from "../controller/expenses.controller.js";

const router = Router()

router.get('/expenses', getAllExpenses)
router.post('/expenses', createNewExpense)
router.delete('/expenses/:id', deleteExpense)
router.put('/expenses/:id', updateExpense)


export default router;
import { Router} from "express"
import { createStockEntry, getAllStockEntries, deleteEntry } from "../controller/stockEntries.controller.js"
import { validateStockEntry } from "../middlewares/stockEntriesMiddlewares.js"
import { authenticate } from "../middlewares/authMiddlewares.js"
const router = Router()

router.post('/entries', authenticate, validateStockEntry, createStockEntry)
router.get('/entries', getAllStockEntries)
router.delete('/entries/:id', deleteEntry)

export default router
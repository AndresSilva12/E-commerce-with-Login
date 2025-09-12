import { Router} from "express"
import { createStockEntry, getAllStockEntries, deleteEntry } from "../controller/stockEntries.controller.js"
import { validateStockEntry, validateStockEntryExist } from "../middlewares/stockEntriesMiddlewares.js"
import { authenticate } from "../middlewares/authMiddlewares.js"
const router = Router()

router.post('/entries', authenticate, validateStockEntry, createStockEntry)
router.get('/entries', authenticate, getAllStockEntries)
router.delete('/entries/:id', authenticate, validateStockEntryExist,  deleteEntry)

export default router
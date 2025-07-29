import { Router} from "express"
import { createStockEntry, getAllStockEntries, deleteEntry } from "../controller/stockEntries.controller.js"
import { validateStockEntry } from "../middlewares/stockEntriesMiddlewares.js"
const router = Router()

router.post('/entries', validateStockEntry, createStockEntry)
router.get('/entries', getAllStockEntries)
router.delete('/entries/:id', deleteEntry)

export default router
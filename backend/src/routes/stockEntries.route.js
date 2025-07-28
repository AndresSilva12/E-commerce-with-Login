import { Router} from "express"
import { createStockEntry, getAllStockEntries, deleteEntry } from "../controller/stockEntries.controller.js"
const router = Router()

router.post('/entries', createStockEntry)
router.get('/entries', getAllStockEntries)
router.delete('/entries/:id', deleteEntry)

export default router
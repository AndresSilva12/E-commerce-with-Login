import {Router} from 'express'
import { createVariant, deleteAllVariantsByProduct, deleteVariant, getAllVariants, getAllVariantsByProduct, getOnlyOneVariant, updateVariant } from '../controller/productVariant.controller.js';

const router = Router()

router.post('/variants', createVariant)

router.get('/variants', getAllVariants)

router.get('/variants/id/:id', getOnlyOneVariant)

router.get('/variants/product/:productId', getAllVariantsByProduct)

router.delete('/variants/id/:id', deleteVariant)

router.delete('/variants/product/:productId', deleteAllVariantsByProduct)

router.put('/variants/:id', updateVariant)

export default router
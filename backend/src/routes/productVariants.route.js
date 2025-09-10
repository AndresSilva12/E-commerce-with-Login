import {Router} from 'express'
import { createVariant, deleteAllVariantsByProduct, deleteVariant, getVariants, getAllVariantsByProduct, getOnlyOneVariant, updateVariant, disableVariant } from '../controller/productVariant.controller.js';
import { validateCreateVariant, validateUpdateVariant, validateVariantExist, validateUniqueCode } from '../middlewares/productVariantMiddlewares.js';

const router = Router()

router.post('/variants', validateCreateVariant, createVariant)

router.get('/variants', getVariants)

router.post('/variants/:code/check', validateUniqueCode)

router.get('/variants/id/:id', validateVariantExist, getOnlyOneVariant)

router.get('/variants/product/:productId', getAllVariantsByProduct)

router.delete('/variants/id/:id', validateVariantExist, deleteVariant)

router.delete('/variants/product/:productId', deleteAllVariantsByProduct)

router.put('/variants/:id',validateVariantExist, validateUpdateVariant, updateVariant)

router.patch('/variants/:id/disable', disableVariant)

export default router
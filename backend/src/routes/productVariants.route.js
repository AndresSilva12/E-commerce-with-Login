import {Router} from 'express'
import { createVariant, deleteAllVariantsByProduct, deleteVariant, getAllVariants, getAllVariantsByProduct, getOnlyOneVariant, updateVariant } from '../controller/productVariant.controller.js';
import { validateCreateVariant, validateUpdateVariant, validateVariantExist } from '../middlewares/productVariantMiddlewares.js';

const router = Router()

router.post('/variants', validateCreateVariant, createVariant)

router.get('/variants', getAllVariants)

router.get('/variants/id/:id', validateVariantExist, getOnlyOneVariant)

router.get('/variants/product/:productId', getAllVariantsByProduct)

router.delete('/variants/id/:id', validateVariantExist, deleteVariant)

router.delete('/variants/product/:productId', deleteAllVariantsByProduct)

router.put('/variants/:id',validateVariantExist, validateUpdateVariant, updateVariant)

export default router
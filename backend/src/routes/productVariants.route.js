import {Router} from 'express'
import { createVariant, getVariants, updateVariant, disableVariant, enableVariant } from '../controller/productVariant.controller.js';
import { validateCreateVariant, validateUpdateVariant, validateVariantExist, validateUniqueCode } from '../middlewares/productVariantMiddlewares.js';
import { authenticate } from "../middlewares/authMiddlewares.js"

const router = Router()

router.post('/variants',authenticate, validateCreateVariant, createVariant)

router.get('/variants',authenticate, getVariants)

router.post('/variants/:code/check',authenticate, validateUniqueCode)

router.put('/variants/:id',authenticate, validateVariantExist, validateUpdateVariant, updateVariant)

router.patch('/variants/:id/disable',authenticate, validateVariantExist, disableVariant)

router.patch('/variants/:id/enable',authenticate, validateVariantExist, enableVariant)

export default router
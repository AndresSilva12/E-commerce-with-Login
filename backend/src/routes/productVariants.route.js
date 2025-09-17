import {Router} from 'express'
import { createVariant, getVariants, updateVariant, disableVariant, enableVariant } from '../controller/productVariant.controller.js';
import { validateCreateVariant, validateUpdateVariant, validateVariantExist, validateUniqueCode } from '../middlewares/productVariantMiddlewares.js';
import { authenticate, authorizeRoles } from "../middlewares/authMiddlewares.js"

const router = Router()

router.post('/variants',authenticate, authorizeRoles, validateCreateVariant, createVariant)

router.get('/variants',authenticate, getVariants)

router.post('/variants/:code/check',authenticate, authorizeRoles, validateUniqueCode)

router.put('/variants/:id',authenticate, authorizeRoles, validateVariantExist, validateUpdateVariant, updateVariant)

router.patch('/variants/:id/disable',authenticate, authorizeRoles, validateVariantExist, disableVariant)

router.patch('/variants/:id/enable',authenticate, authorizeRoles, validateVariantExist, enableVariant)

export default router
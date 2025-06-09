import {Router} from 'express'
import { createProductVariant } from '../controller/productVariant.controller.js';

const router = new Router()

router.post('/variants', createProductVariant)

export default router
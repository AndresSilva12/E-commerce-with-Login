import { Router } from "express"
import { createUser, getAllUsers, deleteUserSelected, updateMyUser, deleteMyUser, loginUser, getCurrentUser, logoutUser, refreshSesion } from "../controller/user.controller.js"
import { validateCreateUsers, validateUserExist, validateLoginUser, validateUpdateUser } from "../middlewares/usersMiddlewares.js"
import { authenticate, authorizeRoles } from "../middlewares/authMiddlewares.js"

const router = Router()

router.post('/register', validateCreateUsers, createUser)

router.post('/login', validateLoginUser, loginUser)

router.post('/refresh-token', authenticate, refreshSesion)

router.post('/logout', authenticate, logoutUser)

router.get('/users', authenticate, authorizeRoles, getAllUsers)

router.delete('/users/:id', authenticate, authorizeRoles, validateUserExist, deleteUserSelected)

router.get('/me', authenticate, getCurrentUser)

router.put('/me',authenticate,  validateUserExist, validateUpdateUser, updateMyUser)

router.delete('/me',authenticate,  validateUserExist, deleteMyUser)

export default router
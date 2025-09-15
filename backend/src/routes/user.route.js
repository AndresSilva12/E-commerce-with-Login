import { Router } from "express"
import { createUser, getAllUsers, deleteUserSelected, updateUserSelected, loginUser, dashboardProtected, logoutUser, refreshSesion } from "../controller/user.controller.js"
import { validateCreateUsers, validateUserExist, validateLoginUser, validateUpdateUser } from "../middlewares/usersMiddlewares.js"
import { authenticate, authorizeRoles } from "../middlewares/authMiddlewares.js"

const router = Router()

router.post('/register', validateCreateUsers, createUser)

router.post('/login', validateLoginUser, loginUser)

router.post('/refresh-token', authenticate, refreshSesion)

router.post('/logout', authenticate, logoutUser)

router.get('/dashboard', dashboardProtected)

router.get('/users', authenticate, authorizeRoles, getAllUsers)

router.delete('/users/:id', authenticate, validateUserExist, deleteUserSelected)

router.put('/users/:id',authenticate,  validateUserExist, validateUpdateUser, updateUserSelected)

export default router
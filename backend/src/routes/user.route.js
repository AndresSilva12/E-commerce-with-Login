import { Router } from "express"
import { createUser, getAllUsers, getOneUser, deleteUserSelected, updateUserSelected, loginUser, dashboardProtected, logoutUser } from "../controller/user.controller.js"
import { validateCreateUsers, validateUserExist, validateLoginUser, validateUpdateUser } from "../middlewares/usersMiddlewares.js"

const router = Router()

router.post('/register', validateCreateUsers, createUser)

router.post('/login', validateLoginUser, loginUser)

router.post('/logout', logoutUser)

router.get('/dashboard', dashboardProtected)

router.get('/users', getAllUsers)

router.get('/users/:id', validateUserExist, getOneUser)

router.delete('/users/:id', validateUserExist, deleteUserSelected)

router.put('/users/:id', validateUserExist, validateUpdateUser, updateUserSelected)

export default router
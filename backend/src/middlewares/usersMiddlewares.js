import {userSchema, updateUserSchema} from "../../../validation/userSchema.js"
import bcrypt from 'bcrypt'
import prisma from "../db.js" 


export const validateCreateUsers = async (req, res, next) => {
    try{
        const errors = {}
        const parsed = userSchema.safeParse(req.body)

        if (!parsed.success) return res.status(400).json({error: errors})

        const {username, email, phoneNumber} = parsed.data

        const usernameExist = await prisma.users.findFirst({
            where:{
                username: username
            }
        })
        if (usernameExist) errors.username = "El nombre de usuario ya está en uso"    

        const emailExist = await prisma.users.findFirst({
            where: {
                email: email
            }
        })
        if (emailExist) errors.email = "El correo electronico ya está en uso"

        const phoneExist = await prisma.users.findFirst({
            where: {
                phoneNumber: phoneNumber
            }
        })
        if (phoneExist) errors.phoneNumber = "El numero de telefono ya está registrado"

        if (Object.keys(errors).length > 0) return res.status(400).json({errors})

        req.body = parsed.data
        next()
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error interno durante la validacion de creacion de datos del usuario"})
    }
}

export const validateUserExist = async(req, res, next) =>{
    try{
        const idParsed = Number(req.params.id)
        if(!idParsed || isNaN(idParsed)) return res.status(400).json({error: "El id ingresado es inválido"})
    
        const userExist = await prisma.users.findUnique({
            where: {
                id: idParsed
            }
        })
        if (!userExist) return res.status(404).json({error: "El id de usuario no existe"})
    
        req.params.id = idParsed
        next()
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error interno durante la validacion de usuario"})
    }
}

export const validateUpdateUser = async (req, res, next) => {
    try{
        const errors = {}
        const parsed = updateUserSchema.safeParse(req.body)
        if (!parsed.success) return res.status(400).json({error: parsed.error.flatten().fieldErrors})
        const {username, email, phoneNumber} = parsed.data
        const user = await prisma.users.findUnique({
            where: {
                id: req.params.id
            }
        })

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" })
        }
        
        if (username){
            if (username !== user.username){
                const userExist = await prisma.users.findFirst({
                    where: {
                        username: username
                    }
                })
                if (userExist) errors.username = "El nombre de usuario ya está en uso"
            }
            req.body.username = username
        }

        if (email){
            if (email !== user.email){
                const emailExist = await prisma.users.findFirst({
                    where: {
                        email: email
                    }
                })
                if (emailExist) errors.email = "El email ya está en uso"
            }
            req.body.email = email
        }

        if (phoneNumber){
            if (phoneNumber !== user.phoneNumber){
                const phoneExist = await prisma.users.findFirst({
                    where: {
                        phoneNumber: phoneNumber
                    }
                })
                if (phoneExist) errors.phoneNumber = "El numero de teléfono ya pertenece a alguien más"
            }
            req.body.phoneNumber = phoneNumber
        }

        if (Object.keys(errors).length > 0) return res.status(400).json({errors})

        req.body = parsed.data

        next()
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error interno al validar actualizacion de usuario"})
    }
}

    export const validateLoginUser = async (req, res, next) => {
        try{
            const errors = {}
            const {username, password} = req.body
            const usernameClean = username.trim()
            const passwordClean = password.trim()
            if (!usernameClean)  errors.username = "Ingrese un nombre de usuario valido"
        
            const userExist = await prisma.users.findFirst({
                where: {
                    username: usernameClean
                },
                select: {
                    password: true
                }
            })
        
            if (!userExist) errors.username = "El usuario no existe"
            
            if (!passwordClean) errors.password = "La contraseña es obligatoria"

            if (Object.keys(errors).length > 0) return res.status(400).json({errors})
            const passwordIsValid = bcrypt.compareSync(passwordClean, userExist.password)
            if (!passwordIsValid) errors.password = "Contraseña Incorrecta"


            req.passwordHashed = userExist.password
            req.body.username = usernameClean
            req.body.password = passwordClean
            next()
        }
        catch (error){
            console.log(error)
            return res.status(500).json({error: "Error interno al intentar validar el login de usuario"})
        }
}
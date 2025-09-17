import jwt from "jsonwebtoken";

export const authenticate = async(req, res, next) => {
    const accessToken = req.cookies.accessToken
    if (!accessToken){
        return res.status(401).json({error: "Debe iniciar sesión"})
    }
    try {
        const payload = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        req.user = payload
        next()
    } catch (error) {
        return res.status(401).json({error: "Token inválido o expirado"})
    }
}

export const authorizeRoles = (req, res, next) => {
    const isAdmin = req.user.role === 'ADMIN'
    if (!isAdmin){
        return res.status(403).json({error: "No tiene permiso para realizar esta acción"})
    }
    next()
}
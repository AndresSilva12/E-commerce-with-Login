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
        console.log("error durante Authenticate: ", error)
        return res.status(401).json({error: "Token inválido o expirado"})
    }
}
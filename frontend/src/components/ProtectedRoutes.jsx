import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

function ProtectedRoutes({ children, roles }) {
    const { isAuthenticated, user } = useContext(AuthContext)

    if (isAuthenticated === false) return <Navigate to='/login' />

    if (roles && user && !roles.includes(user.role)) {
        return <Navigate to='/products' />
    }

    return children
}

export default ProtectedRoutes
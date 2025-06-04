import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

function ProtectedRoutes ({children}) {
    const {isAuthenticated} = useContext(AuthContext)

    if (isAuthenticated == false) return <Navigate to='/login'/>

    return children
}

export default ProtectedRoutes
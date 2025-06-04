import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function GuestOnlyRoute ({children}) {
    const {isAuthenticated} = useContext(AuthContext)

    if (isAuthenticated) return <Navigate to='/'/>

    return children
}

export default GuestOnlyRoute;
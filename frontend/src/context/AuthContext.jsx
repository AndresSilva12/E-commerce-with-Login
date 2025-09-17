import { handleAuth } from "../utils/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [user, setUser] = useState()

    useEffect(() => {
        const intervalId = setInterval(async () => {
            const res = await fetch('http://localhost:3000/api/refresh-token', {
                method: 'POST',
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                }
            })
            const data = await res.json()
            console.log(data)
        }, 600000);
        return () => clearInterval(intervalId)
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/me', {
                    credentials: 'include'
                })
                const data = await res.json()

                if (!res.ok) {
                    handleAuth(res, data, setIsAuthenticated)
                    return
                }

                setIsAuthenticated(true)
                setUser(data)
            } catch (error) {
                setIsAuthenticated(false)
                console.log(error)
            }
        }
        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
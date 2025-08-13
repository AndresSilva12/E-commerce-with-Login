import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)

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
        fetch('http://localhost:3000/api/dashboard', {
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {
                    setIsAuthenticated(false)
                    return null
                }
                return res.json()
            })
            .then(data => {
                if (data) setIsAuthenticated(true)
            })
            .catch(error => {
                setIsAuthenticated(false)
            })

    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}
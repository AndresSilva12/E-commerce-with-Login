import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext, useState } from 'react'
import { handleAuth } from '../utils/auth.js'

export function useCategories () {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const { setIsAuthenticated } = useContext(AuthContext)

    const getCategories = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/category',{
                credentials: "include"
            })
            const data = await res.json()
            
            if (!res.ok){
                handleAuth(data, setIsAuthenticated, navigate)
                return
            }

            setCategories(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const createCategory = async (formData, setError, closeModal) => {
        try {
            const res = await fetch('http://localhost:3000/api/category', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
                credentials: "include"
            })
            const data = await res.json()

            if (!res.ok){
                if (data.errors){
                    for (const [field, message] of Object.entries(data.errors)) {
                        setError(field, {
                            type: "server",
                            message: message,
                        });
                    }
                }
                handleAuth(data, setIsAuthenticated, navigate)
                return
            }

            setCategories((prev) => ([...prev, data]))
            closeModal()
        } catch (error) {
            console.log(error.message)
        }
    }

    const updateCategory = async (id, formData, setError, closeModal) => {
        try {
            const res = await fetch(`http://localhost:3000/api/category/${id}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
                credentials: "include"
            })
            const data = await res.json()

            if (!res.ok){
                if (data.errors){
                    for (const [field, message] of Object.entries(data.errors)) {
                        setError(field, {
                            type: "server",
                            message: message,
                        });
                    }
                }
                handleAuth(data, setIsAuthenticated, navigate)
                return
            }

            setCategories((prev) => (prev.map(c => c.id === id ? data : c)))
            closeModal()
        } catch (error) {
            console.log(error.message)
        }   
    }

    return {
        categories,
        getCategories,
        createCategory,
        updateCategory
    }
}
import { AuthContext } from "../context/AuthContext"
import { toast } from "../utils/notifyToast.js";
import { useNavigate } from "react-router-dom"
import { handleAuth } from "../utils/auth.js"
import { useContext } from "react"

export function useExpenses () {
    const navigate = useNavigate()
    const { setIsAuthenticated} = useContext(AuthContext)

    const createExpense = async (formData) => {
        try {
            const res = await fetch('http://localhost:3000/api/expenses',{
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
                credentials: "include"
            })
            const data = await res.json()

            if (!res.ok){
                handleAuth(data, setIsAuthenticated, navigate)
                return
            }
            toast("Gasto registrada con exito!")
            return data
        } catch (error) {
            console.log(error.message)
        }
    }

    const updateExpense = async (formData, id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/expenses/${id}`,{
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
                credentials: "include"
            })
            const data = await res.json()
            
            if (!res.ok){
                handleAuth(data, setIsAuthenticated, navigate)
                return
            }
            toast("Gasto Actualizado con exito!")
            return data
        } catch (error) {
            console.log(error.message)
        }
    }

    const deleteExpense = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/expenses/${id}`,{
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
                credentials: "include"
            })
            const data = await res.json()
            
            if (!res.ok){
                handleAuth(data, setIsAuthenticated, navigate)
                return
            }
            toast("Gasto eliminado con exito!")
            return id
        } catch (error) {
            console.log(error.message)
        }
    }

    return {
        createExpense,
        updateExpense,
        deleteExpense
    }
}
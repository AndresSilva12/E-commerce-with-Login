import { toast } from "../utils/notifyToast.js"
import { useProducts } from "../context/ProductContext"
import { useState, useContext } from "react"
import { AuthContext } from '../context/AuthContext'
import {handleAuth} from "../utils/auth.js"
import { useNavigate } from 'react-router-dom'


export function useStockEntries () {
    const [stockEntries, setStockEntries] = useState([])
    const [totalPages, setTotalPages] = useState()
    const navigate = useNavigate()
    const {updateVariantContext} = useProducts()
    const {setIsAuthenticated} = useContext(AuthContext)

    const getAllStockEntries = async(query) => {
        try{
            const res = await fetch(`http://localhost:3000/api/entries?${query}`, {
                method: 'GET',
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json()

            if (!res.ok){
                handleAuth(res, data, setIsAuthenticated, navigate)
                return
            }

            setStockEntries(data.allStockEntries)
            setTotalPages(data.pagination.totalPages)
        } catch (error) {
            console.log(error.message)
        }
    }

    const createEntry = async(entryData) => {
        try{
            const res = await fetch('http://localhost:3000/api/entries', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(entryData),
                credentials: "include"
            })
            const data = await res.json()
            
            if (!res.ok){
                handleAuth(res, data, setIsAuthenticated, navigate)
                return
            }

            setStockEntries((prev) => ([...prev, data]))
            for (const variant of data.updatedVariants){
                updateVariantContext(variant.id, variant)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const deleteEntry = async(id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/entries/${id}`,{
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json()
            
            if (!res.ok){
                handleAuth(res, data, setIsAuthenticated, navigate)
                return
            }
    
            setStockEntries((prev) => (prev.filter(e => e.id !== id)))
            toast("Entrada eliminada con exito!")
        } catch (error) {
            console.log(error.message)
        }
    }

    return {
        stockEntries,
        totalPages,
        getAllStockEntries,
        createEntry,
        deleteEntry
    }
}
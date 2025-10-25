import { useProducts } from "../context/ProductContext.jsx"
import { toast } from "../utils/notifyToast.js";
import { useState, useContext } from "react"
import { AuthContext } from '../context/AuthContext'
import { handleAuth } from "../utils/auth.js"

export function useSales () {
    const [sales, setSales] = useState([])
    const [totalPages, setTotalPages] = useState()
    const { updateVariantContext} = useProducts()
    const {setIsAuthenticated} = useContext(AuthContext)

    const getAllSales = async(query) => {
        try {
            const res = await fetch(`http://localhost:3000/api/sales?${query}`,{
                method: 'GET',
                credentials: "include"
            })
            const data = await res.json()

            if (!res.ok){
                handleAuth(res, data, setIsAuthenticated)
                return
            }

            setSales(data.allSales)
            setTotalPages(data.pagination.totalPages)
            console.log(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const createSale = async(saleData) => {
        try {
            const res = await fetch('http://localhost:3000/api/sales',{
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body:JSON.stringify(saleData),
                credentials: "include",
            })
            const data = await res.json()

            if (!res.ok){
                handleAuth(res, data, setIsAuthenticated)
                return
            }

            setSales((prev) => ([...prev, data]))
            for(const variant of data.updatedVariants){
                updateVariantContext(variant.id, variant)
            }
            toast("Venta registrada con exito!")
            return data
        } catch (error) {
            console.log(error.message)
        }
    }

    const deleteSale = async(saleId) => {
        try {
            const res = await fetch(`http://localhost:3000/api/sales/${saleId}`,{
                method: 'DELETE',
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json()

            if (!res.ok){
                handleAuth(res, data, setIsAuthenticated)
                return
            }

            setSales((prev) => (prev.filter((s => s.id !== saleId))))
            toast("Venta eliminada con exito!")
        } catch (error) {
            console.log(error.message)
        }
    }

    return {
        sales,
        totalPages,
        getAllSales,
        createSale,
        deleteSale
    }
}
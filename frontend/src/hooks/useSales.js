import { useProducts } from "../context/ProductContext.jsx"
import { toast } from "../utils/notifyToast.js";
import { useState } from "react"

export function useSales () {
    const [sales, setSales] = useState([])
    const [totalPages, setTotalPages] = useState()
    const { fetchProducts} = useProducts()

    const getAllSales = async(query) => {
        const res = await fetch(`http://localhost:3000/api/sales?${query}`,{
            method: 'GET',
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json()
        setSales(data.allSales)
        setTotalPages(data.pagination.totalPages)
    }

    const createSale = async(saleData) => {
        const res = await fetch('http://localhost:3000/api/sales',{
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body:JSON.stringify(saleData),
            credentials: "include",
        })
        const data = await res.json()
        setSales((prev) => ({...prev, data}))
        toast("Venta registrada con exito!")
        fetchProducts()
        return data
    }

    const deleteSale = async(saleId) => {
        const res = await fetch(`http://localhost:3000/api/sales/${saleId}`,{
            method: 'DELETE',
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json()
        setSales((prev) => (prev.filter((s => s.id !== saleId))))
        toast("Venta eliminada con exito!")
    }

    return {
        sales,
        totalPages,
        getAllSales,
        createSale,
        deleteSale
    }
}
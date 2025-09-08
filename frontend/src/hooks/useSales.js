import { useProducts } from "../context/ProductContext.jsx"
import { toast } from "../utils/notifyToast.js";
import { useState } from "react"

export function useSales () {
    const [sales, setSales] = useState()
    const { fetchProducts} = useProducts()

    const getAllSales = async() => {
        const res = await fetch('http://localhost:3000/api/sales',{
            method: 'GET',
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await res.json()
        setSales(data)
    }

    const createSale = async(saleData) => {
        const res = await fetch('http://localhost:3000/api/sales',{
            method: 'POST',
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body:JSON.stringify(saleData),
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
            }
        })
        const data = await res.json()
        setSales((prev) => (prev.filter((s => s.id !== saleId))))
        toast("Venta eliminada con exito!")
    }

    return {
        sales,
        getAllSales,
        createSale,
        deleteSale
    }
}
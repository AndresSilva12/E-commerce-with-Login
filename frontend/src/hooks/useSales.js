import { notify } from "../utils/notifyToast.js"
import { useState } from "react"

export function useSales () {
    const [sales, setSales] = useState()

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
            headers: {
                "content-type": "application/json"
            },
            body:JSON.stringify(saleData),
        })
        const data = await res.json()
        notify("success", "Venta registrada con éxito!")
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
        notify("success", "Venta eliminada con éxito!")
        console.log("Venta eliminada con éxito! ", data)
    }

    return {
        sales,
        getAllSales,
        createSale,
        deleteSale
    }
}
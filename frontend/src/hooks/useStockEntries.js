import { toast } from "../utils/notifyToast.js"
import { useProducts } from "../context/ProductContext"
import { useState } from "react"

export function useStockEntries () {
    const [stockEntries, setStockEntries] = useState([])
    const [totalPages, setTotalPages] = useState()
    const {updateVariantToProduct} = useProducts()

    const getAllStockEntries = async(query) => {
        const res = await fetch(`http://localhost:3000/api/entries?${query}`, {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json()
        setStockEntries(data.allStockEntries)
        setTotalPages(data.pagination.totalPages)
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
                    console.log("Hubo un error durante la creación", data)
                    return
                }
            setStockEntries((prev) => ([...prev, data]))
            for (const variant of data.updatedVariants){
                updateVariantToProduct(variant.productId, variant.id, variant)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const deleteEntry = async(id) => {
        const res = await fetch(`http://localhost:3000/api/entries/${id}`,{
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json()
        setStockEntries((prev) => (prev.filter(e => e.id !== id)))
        toast("Entrada eliminada con exito!")
    }

    return {
        stockEntries,
        totalPages,
        getAllStockEntries,
        createEntry,
        deleteEntry
    }
}
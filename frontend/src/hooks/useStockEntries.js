import { toast } from "../utils/notifyToast.js"
import { useProducts } from "../context/ProductContext"
import { useState } from "react"

export function useStockEntries () {
    const [stockEntries, setStockEntries] = useState([])
    const {updateVariantToProduct} = useProducts()

    const getAllStockEntries = async() => {
        const res = await fetch('http://localhost:3000/api/entries', {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await res.json()
        setStockEntries(data)
    }

    const createEntry = async(entryData) => {
        try{
            const res = await fetch('http://localhost:3000/api/entries', {
                method: 'POST',
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(entryData)
            })
            const data = await res.json()
            if (!res.ok){
                    console.log("Hubo un error durante la creación", res)
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
            }
        })
        const data = await res.json()
        setStockEntries((prev) => (prev.filter(e => e.id !== id)))
        toast("Entrada eliminada con exito!")
    }

    return {
        stockEntries,
        getAllStockEntries,
        createEntry,
        deleteEntry
    }
}
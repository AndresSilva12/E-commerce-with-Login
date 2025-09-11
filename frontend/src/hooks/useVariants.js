import { useEffect, useState } from "react"
import { toast } from "../utils/notifyToast.js";
import { useProducts } from "../context/ProductContext.jsx"
import isEqual from 'lodash.isequal'
import { useStockEntries } from "./useStockEntries.js"

export function useVariants () {
    const { updateVariantToProduct, fetchVariants} = useProducts()
    const {createEntry} = useStockEntries()
    const [variants, setVariants] = useState([])

    const getOneVariant = async(variant, setError) => {
        try{
            const res = await fetch(`http://localhost:3000/api/variants/${variant.code}/check`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(variant)
            })
            const data = await res.json()
            if (!res.ok){
                setError("code", {
                    type: "server",
                    message: data.message
                })
                return {success: false, error: data.message}
            }
            return {success: true}
        }
        catch(error){
            console.log(error)
        }
    }

    const createVariant = async(formData) => {
        const {motive, purchasePrice, ...formDataClean} = formData
        try {
            const res = await fetch('http://localhost:3000/api/variants', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formDataClean)
            })
            const data = await res.json()
            if (!res.ok){
                console.log("Hubo un error durante la creación", data)
                return
            }
            const entryData = {
                items: [
                    {
                        variantId: data.id,
                        quantity: formDataClean.stock,
                        purchasePrice: purchasePrice
                    }
                ],
                motive: motive || "Stock Inicial",
                total: formDataClean.stock * purchasePrice
            }
            await createEntry(entryData)
            await fetchVariants()
            toast("variante creada con exito!")
            return {
                ...data,
                stock: formData.stock
            }
        } catch (error) {
            console.log(error)
        }
    }

    const disableVariant = async(variant) => {
        if (variant.id) {
            deleteVariant(variant.id)
            const res = await fetch(`http://localhost:3000/api/variants/id/${variant.id}/disable`,{
                method: 'PATCH',
                headers: {
                    "Content-type": "application/json"
                }
            })
            const data = await res.json()
            toast("variante eliminada con exito!")
        }
    }

    const updateVariant = async(formData, variant) =>  {
        try {
            const {createdAt, ...variantWithoutCreatedAt} = variant
            if (isEqual(formData, variantWithoutCreatedAt)){
                return {success: true}
            }
            const res = await fetch(`http://localhost:3000/api/variants/${variant.id}`,{
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (!res.ok) {
                return {success: false, errors: data.errors}
            }
            await updateVariantToProduct(data.productId, data.id, data)
            toast("variante actualizada con exito!")
            return data
        }
        catch (error){
            return {success: false}
        }
    }
    useEffect(() => {
        fetchVariants()
    }, [])

    return{
        variants,
        setVariants,
        createVariant,
        disableVariant,
        updateVariant,
        getOneVariant
    }
}
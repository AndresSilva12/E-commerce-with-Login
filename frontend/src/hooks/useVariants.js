import { useState, useContext } from "react"
import { toast } from "../utils/notifyToast.js";
import { useProducts } from "../context/ProductContext.jsx"
import isEqual from 'lodash.isequal'
import { useStockEntries } from "./useStockEntries.js"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { handleAuth } from "../utils/auth.js";

export function useVariants () {
    const navigate = useNavigate()
    const { setIsAuthenticate } = useContext(AuthContext)
    const { updateVariantToProduct, fetchVariants} = useProducts()
    const {createEntry} = useStockEntries()
    const [variantsDisabled, setVariantsDisabled] = useState([])

    const fetchVariantsDisabled = async() => {
        try {
            const res = await fetch(`http://localhost:3000/api/variants?onlyDisabled=true`,{
                credentials: "include"
            })
            const data = await res.json()
    
            if (!res.ok){
                handleAuth(data, setIsAuthenticate, navigate)
                return
            }
            setVariantsDisabled(data.variants)
        } catch (error) {
            console.log(error.message)
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
                body: JSON.stringify(formDataClean),
                credentials: "include"
            })
            const data = await res.json()

            if (!res.ok){
                handleAuth(data, setIsAuthenticate, navigate)
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
            return {...data, stock: formData.stock}
        } catch (error) {
            console.log(error.message)
        }
    }

    const disableVariant = async(id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/variants/${id}/disable`,{
                method: 'PATCH',
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json()
    
            if (!res.ok){
                handleAuth(data, setIsAuthenticate, navigate)
                return
            }
            
            toast("variante deshabilitada con exito!")
            fetchVariants()
        } catch (error) {
            console.log(error.message)
        }
    }

    const enableVariant = async(id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/variants/${id}/enable`,{
                method: 'PATCH',
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json()
    
            if (!res.ok){
                handleAuth(data, setIsAuthenticate, navigate)
                return
            }
    
            toast("variante habilitada con exito!")
            fetchVariantsDisabled()
            fetchVariants()
        } catch (error) {
            console.log(error.message)
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
                body: JSON.stringify(formData),
                credentials: "include"
            })
            const data = await res.json()
            if (!res.ok) {
                handleAuth(data, setIsAuthenticate, navigate)
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

    return{
        variantsDisabled,
        setVariantsDisabled,
        fetchVariantsDisabled,
        createVariant,
        disableVariant,
        enableVariant,
        updateVariant
    }
}
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
    const { setIsAuthenticated } = useContext(AuthContext)
    const { updateVariantContext, fetchVariants, setVariants} = useProducts()
    const {createEntry} = useStockEntries()
    const [variantsDisabled, setVariantsDisabled] = useState([])

    const fetchVariantsDisabled = async() => {
        try {
            const res = await fetch(`http://localhost:3000/api/variants?onlyDisabled=true`,{
                credentials: "include"
            })
            const data = await res.json()
    
            if (!res.ok){
                handleAuth(res, data, setIsAuthenticated, navigate)
                return
            }
            setVariantsDisabled(data.variants)
        } catch (error) {
            console.log(error.message)
        }
    }

    const getOneVariant = async(variant, setError) => {
        try{
            const res = await fetch(`http://localhost:3000/api/variants/${variant.code}/check`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(variant),
                credentials: "include"
            })
            const data = await res.json()
            if (!res.ok){
                const authError = handleAuth(res, data, setIsAuthenticated, navigate)
                if (!authError && data.message){
                    setError("code", {
                        type: "server",
                        message: data.message
                    })
                    toast(data.message, "error")
                    return {success: false, error: data.message}
                }
                return {success: false, error: data.error}
            }
            return {success: true}
        }
        catch(error){
            return { success: false, error: "Ocurrió un error inesperado." }
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
                handleAuth(res, data, setIsAuthenticated, navigate)
                return {success: false, errors: data.errors}
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
                handleAuth(res, data, setIsAuthenticated, navigate)
                return
            }
            
            setVariants(prev => prev.filter(v => v.id !== id))
            toast("variante deshabilitada con exito!")
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
                handleAuth(res, data, setIsAuthenticated, navigate)
                return
            }
    
            toast("variante habilitada con exito!")
            fetchVariantsDisabled()
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
                handleAuth(res, data, setIsAuthenticated, navigate)
                return {success: false, errors: data.errors}
            }
            await updateVariantContext(data.id, data)
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
        getOneVariant,
        createVariant,
        disableVariant,
        enableVariant,
        updateVariant
    }
}
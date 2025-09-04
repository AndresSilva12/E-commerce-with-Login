import { useEffect, useState } from "react"
import { notify } from "../utils/notifyToast.js"
import { useProducts } from "../context/ProductContext.jsx"
import { uploadImage } from '../utils/uploads.js'
import isEqual from 'lodash.isequal'
import { deleteAlert } from "../utils/alerts.js"
import { useStockEntries } from "./useStockEntries.js"

export function useVariants () {
    const { addVariantToProduct, deleteVariantToProduct, updateVariantToProduct} = useProducts()
    const {createEntry} = useStockEntries()
    const [variants, setVariants] = useState([])

    const fetchVariants = async() => {
        const res = await fetch('http://localhost:3000/api/variants')
        const data = await res.json()
        setVariants(data)
    }

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
            if (!res.ok){
                console.log("Hubo un error durante la creación", res)
            }
            const data = await res.json()
            const entryData = {
                items: [
                    {
                        variantId: data.id,
                        quantity: formDataClean.stock,
                        purchasePrice: purchasePrice
                    }
                ],
                motive: motive || "Stock Inicial",
                total: formData.stock * purchasePrice
            }
            await createEntry(entryData)
            notify('success', 'Variante creada con éxito!')
            return {id: data.id}
        } catch (error) {
            console.log(error)
        }
    }

    const deleteVariant = async(variant, setVariants) => {
        if (variant.id) {
            deleteVariant(variant.id)
            const res = await fetch(`http://localhost:3000/api/variants/id/${variant.id}`,{
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json"
                }
            })
            const data = await res.json()
            setVariants((prev) => (prev.filter((p) => p.id !== variant.id)))
            await deleteVariantToProduct(data.productId, variant.id)
            notify('success', 'Variante eliminada con éxito')
        }
        setVariants((prev => prev.filter(p => p.localId !== variant.localId)))
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
                body: JSON.stringify(formDataWithoutMotive)
            })
            const data = await res.json()
            if (!res.ok) {
                return {success: false, errors: data.errors}
            }
            await updateVariantToProduct(data.productId, data.id, data)
            notify('success', 'Variante actualizada con éxito')
        }
        catch (error){
            return {success: false}
        }
    }

    const submitVariant = async({setVariants, productUpdate, variantUpdate, data }) => {
        const resolveImage = async(image, prevImage) => {
            if (image === prevImage) return image
            if (image instanceof File) return await uploadImage(image)
            return image
        }

        if (variantUpdate && 'id' in variantUpdate) {
            const { productId, ...variantWithoutProductId } = variantUpdate
            if (isEqual(data, variantWithoutProductId)) {
                return 
            }
        }

        const fullVariant = {...data}
        if (productUpdate) {
            fullVariant.productId = productUpdate.id
            fullVariant.image = await resolveImage(data.image, variantUpdate?.image)

            if (variantUpdate) {
                await updateVariant(fullVariant, variantUpdate)
                setVariants((prev => prev.map(p => p.localId === data.localId ? { ...fullVariant, id: variantUpdate.id } : p)))
            } else {
                const resultVariant = await createVariant(fullVariant)
                if (resultVariant?.id) {
                    const newVariant = {
                        ...fullVariant,
                        id: resultVariant.id
                    }
                    setVariants(prev => [...prev.filter(p => p.localId !== data.localId), newVariant])

                    await addVariantToProduct(productUpdate.id, newVariant)
                }
            }
        } else {
            if (variantUpdate){
                setVariants((prev => prev.map(p => p.localId === data.localId ? data : p)))
            }else{
                setVariants((prev) => [...prev, data])
            }
        }
    }

    useEffect(() => {
        fetchVariants()
    }, [])

    return{
        variants,
        setVariants,
        fetchVariants,
        createVariant,
        deleteVariant,
        updateVariant,
        getOneVariant,
        submitVariant
    }
}
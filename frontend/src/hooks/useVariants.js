import { useState } from "react"
import { notify } from "../utils/notifyToast.js"
import { useProducts } from "../context/ProductContext.jsx"
import { uploadImage } from '../utils/uploads.js'
import isEqual from 'lodash.isequal'

export function useVariants () {
    const { addVariantToProduct, fetchProducts, deleteVariantToProduct, updateVariantToProduct} = useProducts()
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
        try {
            const res = await fetch('http://localhost:3000/api/variants', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            if (!res.ok){
                console.log("Hubo un error durante la creación", res)
            }
            const data = await res.json()
            notify('success', 'Variante creada con éxito!')
            return {id: data.id}
        } catch (error) {
            console.log(error)
        }
    }

    const deleteVariant = async(id) => {
        const res = await fetch(`http://localhost:3000/api/variants/id/${id}`,{
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            }
        })
        const data = await res.json()
        setVariants((prev) => (prev.filter((p) => p.id !== id)))
        await deleteVariantToProduct(data.productId, id)
        notify('success', 'Variante eliminada con éxito')
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
            notify('success', 'Variante actualizada con éxito')
        }
        catch (error){
            return {success: false}
        }
    }

    const submitVariant = async({ setModalVariant, setVariants, productUpdate, variantUpdate, data }) => {
        const resolveImage = async(image, prevImage) => {
            if (image === prevImage) return image
            if (image instanceof File) return await uploadImage(image)
            return image
        }

        if (variantUpdate && 'id' in variantUpdate) {
            const { productId, ...variantWithoutProductId } = variantUpdate
            if (isEqual(data, variantWithoutProductId)) {
                setModalVariant(false)
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
            variantUpdate
                ? setVariants((prev => prev.map(p => p.localId === data.localId ? data : p)))
                : setVariants((prev) => [...prev, data])
        }
        setModalVariant(false)
    }

    return{
        variants,
        fetchVariants,
        createVariant,
        deleteVariant,
        updateVariant,
        getOneVariant,
        submitVariant
    }
}
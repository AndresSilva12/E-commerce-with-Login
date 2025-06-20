import { useState } from "react"
import { notify } from "../utils/notifyToast"

export function useVariants () {
    const [variants, setVariants] = useState([])

    const fetchVariants = async() => {
        const res = await fetch('http://localhost:3000/api/variants')
        const data = await res.json()
        setVariants(data)
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
            const data = await res.json()
            setVariants((prev)=> [...prev, data])
            notify('success', 'Variante creada con éxito!')
        } catch (error) {
            console.log(error)
        }
    }

    const deleteVariant = async(variant) => {
        const res = await fetch(`http://localhost:3000/api/variants/id/${variant.id}`,{
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            }
        })
        const data = await res.json()
        setVariants((prev) => (prev.filter((p) => p.id !== variant.id)))
        notify('success', 'Variante eliminada con éxito')
    }

    const updateVariant = async(variant) =>  {
        const res = await fetch(`http://localhost:3000/api/variants/${variant.id}`,{
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(variant)
        })
        const data = await res.json()
        notify('success', 'Variante actualizada con éxito')
    }

    return{
        variants,
        fetchVariants,
        createVariant,
        deleteVariant,
        updateVariant
    }
}
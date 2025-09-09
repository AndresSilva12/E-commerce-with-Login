import { useState } from "react"

export function useCategories () {
    const [categories, setCategories] = useState([])

    const getCategories = async () => {
        const res = await fetch('http://localhost:3000/api/category')
        const data = await res.json()
        setCategories(data)
    }

    const createCategory = async (formData) => {
        const res = await fetch('http://localhost:3000/api/category', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json()
        setCategories((prev) => ({...prev, data}))
    }

    const updateCategory = async (id, formData) => {
        const res = await fetch(`http://localhost:3000/api/category/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json()
        setCategories((prev) => (prev.filter(c => c.id !== id ? c : data)))
    }

    return {
        categories,
        getCategories,
        createCategory,
        updateCategory
    }
}
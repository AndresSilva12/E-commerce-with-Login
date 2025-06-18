import { useState } from "react"
import { notify } from '../utils/notifyToast.js'

export function useProducts () {
    const [products, setProducts] = useState([])

    const fetchProducts = async() => {
        try {
            const res = await fetch('http://localhost:3000/api/products')
            const data = await res.json()
            setProducts(data)
        } catch (error) {
            console.log("Error interno del servidor durante el proceso")
        }
    }

    const createProduct = async(formProduct) => {
        try{
            const res = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formProduct)
            })
            const data = await res.json()
            setProducts((prev) => [...prev, data])
            notify('success', 'Producto creado con éxito')
        } catch(error){
            notify('error', 'No se pudo crear el producto')
        }
    }

    const deleteProduct = async(id) => {
        try{
            const res = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: 'DELETE'
            })
            const data = await res.json()
            setProducts(prev => prev.filter(p => p.id != id))
        } catch (error){
            console.log("Error interno del servidor durante el proceso")
        }
    }

    const updateProduct = async(formUpdateProduct, productUpdate) => {
        try {
            const res = await fetch(`http://localhost:3000/api/products/${productUpdate.id}`,{
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formUpdateProduct)
            })
            const data = await res.json()
        } catch (error) {
            console.log("Error interno del servidor durante el proceso")
        }
    }

    return{
        createProduct,
        fetchProducts,
        deleteProduct,
        updateProduct,
        products
    }
}
import { useState } from "react"
import { notify } from '../utils/notifyToast.js'

export function useProducts () {
    const [products, setProducts] = useState([])

    const fetchProducts = async() => {
        const res = await fetch('http://localhost:3000/api/products')
        const data = await res.json()
        setProducts(data)
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
            console.log(data)
            fetchProducts()
            notify('success', 'Producto creado con éxito')
        }
        catch(error){
            notify('error', 'No se pudo crear el producto')
        }
    }

    const deleteProduct = async(id) => {
        const res = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: 'DELETE'
        })
        const data = res.json()
        console.log(data)
        fetchProducts()
    }

    const updateProduct = async(formUpdateProduct, productUpdate) => {
        const res = await fetch(`http://localhost:3000/api/products/${productUpdate.id}`,{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formUpdateProduct)
        })
        const data = await res.json()
        console.log("Producto actualizado:", data)
    }


    return{
        createProduct,
        fetchProducts,
        deleteProduct,
        updateProduct,
        products
    }
}
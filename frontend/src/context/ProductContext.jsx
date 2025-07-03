import { createContext, useEffect, useState, useContext } from "react";
import { notify } from "../utils/notifyToast.js";
import isEqual from 'lodash.isequal'

const ProductContext = createContext()

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/products')
            const data = await res.json()
            setProducts([...data])
        } catch (error) {
            console.log("Error interno del servidor durante el proceso")
        }
    }

    const createProduct = async (formProduct, setError) => {
        try {
            const res = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formProduct)
            })
            const data = await res.json()
            if (!res.ok) {
                for (const [field, message] of Object.entries(data.errors)) {
                    if (field === 'variants') {
                        for (const [code, messageVariant] of Object.entries(data.errors.variants)) {
                            setError(`variants.${code}`, {
                                type: "server",
                                message: messageVariant
                            })
                        }
                    } else {
                        setError(field, {
                            type: "server",
                            message: message
                        })
                    }
                }
                return { success: false, errors: data.errors || 'Error Desconocido' }

            }

            setProducts((prev) => [...prev, data])
            notify('success', 'Producto creado con éxito')
            return { success: true }
        } catch (error) {
            notify('error', 'No se pudo crear el producto')
            return { success: false, errors: { general: 'Error interno del servidor' } };
        }
    }

    const deleteProduct = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: 'DELETE'
            })
            const data = await res.json()
            setProducts(prev => prev.filter(p => p.id != id))
        } catch (error) {
            console.log("Error interno del servidor durante el proceso")
        }
    }

    const updateProduct = async (formUpdateProduct, productUpdate, setError) => {
        try {
            const productUpdateWithoutId = {}

            for (const [field, value] of Object.entries(productUpdate)) {
                if (field !== 'id') {
                    productUpdateWithoutId[field] = value
                }
            }

            if (isEqual(formUpdateProduct, productUpdateWithoutId)) {
                return { success: true }
            }

            const res = await fetch(`http://localhost:3000/api/products/${productUpdate.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formUpdateProduct)
            })
            const data = await res.json()
            if (!res.ok) {
                for (const [field, message] of Object.entries(data.errors)) {
                    if (field === 'variants') {
                        for (const [code, messageVariant] of Object.entries(data.errors.variants)) {
                            setError(`variants.${code}`, {
                                type: "server",
                                message: messageVariant
                            })
                        }
                    } else {
                        setError(field, {
                            type: "server",
                            message: message
                        })
                    }
                }
                return { success: false, errors: data.errors || 'Error Desconocido' }
            }
            setProducts(prev => prev.map(p => p.id === data.id ? data : p))
            notify('success', 'Producto actualizado con éxito')
            return { success: true }
        } catch (error) {
            console.log("Error interno del servidor durante el proceso", error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <ProductContext.Provider value={{ products, createProduct, fetchProducts, deleteProduct, updateProduct }}>
            {children}
        </ProductContext.Provider>
    )
}

export function useProducts() {
    return useContext(ProductContext)
}
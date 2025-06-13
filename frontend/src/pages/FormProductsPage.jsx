import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import { productSchema, updateProductSchema } from '../../../validation/productSchema.js'
import { useEffect, useState } from 'react'
import {ToastContainer} from 'react-toastify'
import { notify } from '../utils/notifyToast.js'

function ProductModal({productUpdate, setProductUpdate, fetchProducts}) {
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        mode: 'onChange',
        resolver: zodResolver(updateProductSchema)
    })

    useEffect(()=> {
        if (productUpdate) reset(productUpdate)
    }, [productUpdate, reset])

    const onSubmit = handleSubmit(async(data) => {
        fetch(`http://localhost:3000/api/products/${productUpdate.id}`,{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log("exitoso", data)
            fetchProducts()
            /* notify("Success", "Producto actualizado correctamente!") */
            setProductUpdate(null)
        })
    })


    return productUpdate ? (
        <div>
            <button onClick={() => {setProductUpdate(null)}}>X</button>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='name'>Nombre</label>
                    <input type="text" autoComplete="name" id= "name"  {...register("name")} placeholder={productUpdate.name}/>
                    {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                </div>
                <div>
                    <label htmlFor='brand'>Marca</label>
                    <input type="text" autoComplete="brand" id= "brand" {...register("brand")}/>
                    {errors.brand && <span className="text-red-600">{errors.brand.message}</span>}
                </div>
                <div>
                    <label htmlFor='purchasePrice'>precio de compra</label>
                    <input type="number" autoComplete="purchasePrice" id= "purchasePrice" {...register("purchasePrice")}/>
                    {errors.purchasePrice && <span className="text-red-600">{errors.purchasePrice.message}</span>}
                </div>
                <div>
                    <label htmlFor='salePrice'>precio de venta</label>
                    <input type="number" autoComplete="salePrice" id= "salePrice" {...register("salePrice")}/>
                    {errors.salePrice && <span className="text-red-600">{errors.salePrice.message}</span>}
                </div>
                <div>
                    <label htmlFor='description'>Descripcion (opcional)</label>
                    <input type="text" autoComplete="description" id= "description"/>
                </div>
                <button type='submit'>Actualizar</button>
            </form>
        </div>
    ) : (<></>)
}

function FormProductsPage() {
    const [products, setProducts] = useState([])
    const [productUpdate, setProductUpdate] = useState([])
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onChange',
        resolver: zodResolver(productSchema)
    })

    const fetchProducts = () => {
        fetch('http://localhost:3000/api/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data)
        })
    }

    useEffect(() => {
        fetchProducts()
        setProductUpdate(null)
    }, [])

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
            notify('success', 'Producto creado con éxito')
            fetchProducts()
        }
        catch (error) {
            alert(error)
        }
    }

    const onValid= (formProduct) => {
        console.log(formProduct)
        createProduct(formProduct)
    }

    const onInvalid= () => {
        notify('error','Por favor ingrese todos los datos')
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/api/products/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            fetchProducts()
        })
    }


    return (
        <>
            <form onSubmit={handleSubmit(onValid, onInvalid)} className= "flex flex-col pt-20 m-10 gap-2">
                <div className="flex justify-between">
                    <label htmlFor="name">Nombre</label>
                    <div className="flex gap-4">
                        {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                        <input type="text" autoComplete="name" id= "name" {...register("name")}/>
                    </div>
                </div>
                <div className="flex justify-between">
                    <label htmlFor="purchasePrice">Precio de compra</label>
                    <div className="flex gap-4">
                        {errors.purchasePrice && <span className="text-red-600">{errors.purchasePrice.message}</span>}
                        <input type="number" autoComplete="purchasePrice" id="purchasePrice" {...register("purchasePrice")}/>
                    </div>
                </div>
                <div className="flex justify-between">
                    <label htmlFor="salePrice">Precio de venta</label>
                    <div className="flex gap-4">
                        {errors.salePrice && <span className="text-red-600">{errors.salePrice.message}</span>}
                        <input type="number" autoComplete="salePrice" id="salePrice" {...register("salePrice")}/>
                    </div>
                </div>
                <div className="flex justify-between">
                    <label htmlFor="brand">Marca</label>
                    <div className="flex gap-4">
                        {errors.brand && <span className="text-red-600">{errors.brand.message}</span>}
                        <input type="text" autoComplete="brand" id="brand" {...register("brand")}/>
                    </div>
                </div>
                <div className="flex justify-between">
                    <label htmlFor="description">Descripcion (Opcional)</label>
                    <input type="text" autoComplete="description" id="description" {...register("description")}/>
                </div>
                
                <button type="submit">Send!</button>
            </form>

            <div className="m-10 bg-neutral-900 p-5">
                {products.map((product)=> (
                    <div key={product.id} className="flex justify-between items-center mb-5">
                        <div className= "flex justify-between items-center gap-5">
                            <p>Nombre: {product.name}</p>
                            <p>Marca: {product.brand}</p>
                        </div>
                        <div className= "flex justify-between items-center">
                            <p>Precio de compra: {product.purchasePrice}</p>
                            <p>Precio de venta: {product.salePrice}</p>
                        </div>
                        <button className="bg-green-900" onClick={() => {setProductUpdate(product)}}>Editar</button>
                        <button className="bg-red-900" onClick={() => {handleDelete(product.id)}}>Eliminar</button>
                    </div>
                ))}
            </div>
            <ProductModal productUpdate={productUpdate} setProductUpdate={setProductUpdate} fetchProducts={fetchProducts}/>
            <ToastContainer/>
        </>
    )
}

export default FormProductsPage
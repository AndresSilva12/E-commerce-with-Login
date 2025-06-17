import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import { productSchema } from '../../../validation/productSchema.js'
import { useEffect, useState } from 'react'
import {ToastContainer} from 'react-toastify'
import { notify } from '../utils/notifyToast.js'
import ProductModal from '../components/ProductModal.jsx'
import { useProducts } from '../hooks/useProducts.js'

function FormProductsPage() {
    const [productUpdate, setProductUpdate] = useState(null)
    const {createProduct, deleteProduct, fetchProducts, products} = useProducts()
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onChange',
        resolver: zodResolver(productSchema)
    })

    useEffect(() => {
        if (productUpdate == null){
            fetchProducts()
        }
    }, [productUpdate])

    const onValid= (formProduct) => {
        createProduct(formProduct)
    }

    const onInvalid= () => {
        notify('error','Por favor ingrese todos los datos')
    }

    const onUpdate= () => {
        setProductUpdate(null)
        notify('success', 'Producto actualizado correctamente!')
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
                        <button className="bg-red-900" onClick={() => {deleteProduct(product.id)}}>Eliminar</button>
                    </div>
                ))}
            </div>
            <ProductModal productUpdate={productUpdate} onClose={()=>{setProductUpdate(null)}} onUpdate={()=> {onUpdate()}}/>
            <ToastContainer/>
        </>
    )
}

export default FormProductsPage
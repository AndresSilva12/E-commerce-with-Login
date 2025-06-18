import { productSchema } from '../../../validation/productSchema.js'
import { useEffect, useState } from 'react'
import {ToastContainer} from 'react-toastify'
import { notify } from '../utils/notifyToast.js'
import { useProducts } from '../hooks/useProducts.js'
import ProductModal from '../components/ProductModal.jsx'
import ProductForm from '../components/ProductForm.jsx'

function FormProductsPage() {
    const [modal, setModal] = useState(false)
    const [productUpdate, setProductUpdate] = useState(null)
    const {createProduct, deleteProduct, fetchProducts, products} = useProducts()

    useEffect(() => {
        if (productUpdate === null){
            fetchProducts()
        }
    }, [productUpdate])

    const onValid= (formProduct) => {
        createProduct(formProduct)
    }

    const handleUpdate = (product) => {
        setModal(true)
        setProductUpdate(product)
    }

    const onUpdate= () => {
        setProductUpdate(null)
        notify('success', 'Producto actualizado correctamente!')
        setModal(false)
    }

    return (
        <>
            <ProductForm action="Crear" schema={productSchema} onSubmit={onValid}/>

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
                        <button className="bg-green-900" onClick={() => {handleUpdate(product)}}>Editar</button>
                        <button className="bg-red-900" onClick={() => {deleteProduct(product.id)}}>Eliminar</button>
                    </div>
                ))}
            </div>
            <ProductModal productUpdate={productUpdate} onClose={()=>{setModal(false)}} onUpdate={()=> {onUpdate()}} modal={modal}/>
            <ToastContainer/>
        </>
    )
}

export default FormProductsPage
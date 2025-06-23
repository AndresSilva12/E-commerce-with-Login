import { useProducts } from '../context/ProductContext.jsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { notify } from '../utils/notifyToast.js'
import VariantModal from './VariantModal.jsx'
import { productSchema, updateProductSchema } from '../../../validation/productSchema.js'

function ProductFormModal({productUpdate, modalCreate, onClose, onSubmit}) {
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        mode: 'onChange',
        resolver: zodResolver(modalCreate ? productSchema : updateProductSchema),
        defaultValues: productUpdate
    })
    const {updateProduct, createProduct} = useProducts()
    const [modalVariant, setModalVariant] = useState(false)
    const [variants, setVariants] = useState([])

    useEffect(()=> {
        if (productUpdate.variants){
            setVariants(productUpdate.variants)
        }
    },[])
    

    useEffect(()=> {
        if (productUpdate) reset(productUpdate)
    }, [productUpdate, reset])

    const onValid = (data) => {
        const fullProduct = {
            ...data,
            variants: variants.length > 0 ? variants : []}
        if (!modalCreate){
            updateProduct(fullProduct, productUpdate)
        }else{
            createProduct(fullProduct)
        }
        onSubmit()
    }

    const onInvalid = () => {
        notify('error','Por favor ingrese todos los datos')
    }

    const handleCreate = () => {
        setModalVariant(true)
    }

    const createVariant = (data) =>  {
        setVariants((prev) => [...prev, data])
        setModalVariant(false)
    }

    return (
        <div className='flex flex-col h-screen w-screen fixed top-0 left-0' style={{backgroundColor: 'rgb(0,0,0,0.6)'}}>
            <button className="fixed top-0 right-0" onClick={onClose}>X</button>
            <div className="bg-gray-400">
                <form onSubmit={handleSubmit(onValid, onInvalid)} className= "flex flex-col pt-20 mx-10 gap-2">
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
                    
                    <button type="submit">{modalCreate ? 'Crear' : 'Actualizar'}</button>
                </form>

                {modalVariant && <VariantModal createVariant={createVariant} closeModal={()=> {setModalVariant(false)}}/>}
                <section className="w-full flex flex-col items-center justify-center m-auto gap-4">
                    {variants.map((variant) => (
                        <div key={variant.code} className="flex items-center justify-center gap-4">
                            <p>{variant.code}</p>
                        </div>
                    ))}
                </section>
            </div>

            {!modalVariant && <button onClick={() => {handleCreate()}} className='bg-blue-600'>Agregar Variante</button>}

        </div>
    )
}

export default ProductFormModal;
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import { updateProductSchema } from '../../../validation/productSchema.js'
import { useEffect} from 'react'
import { useProducts } from '../hooks/useProducts.js'

function ProductModal({productUpdate, onClose, onUpdate}) {
    const {updateProduct} = useProducts()
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        mode: 'onChange',
        resolver: zodResolver(updateProductSchema)
    })

    useEffect(()=> {
        if (productUpdate) reset(productUpdate)
    }, [productUpdate, reset])

    const onSubmit = handleSubmit((data) => {
        updateProduct(data, productUpdate)
        onUpdate()
    })


    return productUpdate ? (
        <div className='flex flex-col h-screen w-screen fixed top-0 left-0' style={{backgroundColor: 'rgb(0,0,0,0.6)'}}>
            <button onClick={onClose}>X</button>
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
                    <input type="text" autoComplete="description" id= "description" {...register("description")}/>
                </div>
                <button type='submit'>Actualizar</button>
            </form>
        </div>
    ): (<></>)
}

export default ProductModal;
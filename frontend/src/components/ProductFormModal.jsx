import { useProducts } from '../hooks/useProducts.js'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { notify } from '../utils/notifyToast.js'

function ProductFormModal({productUpdate, onClose, schema, action, defaultValues, onSubmit}) {
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        mode: 'onChange',
        resolver: zodResolver(schema),
        defaultValues: defaultValues
    })
    const {updateProduct, createProduct} = useProducts()
    
    useEffect(()=> {
        if (defaultValues) reset(defaultValues)
    }, [defaultValues, reset])

    const onValid = (data) => {
        if (action == 'Actualizar'){
            updateProduct(data, productUpdate)
        }else{
            createProduct(data)
        }
        onSubmit()
    }

    const onInvalid = () => {
        notify('error','Por favor ingrese todos los datos')
    }

    return (
        <div className='flex flex-col h-screen w-screen fixed top-0 left-0' style={{backgroundColor: 'rgb(0,0,0,0.6)'}}>
            <button onClick={onClose}>X</button>
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
                
                <button type="submit">{action}</button>
            </form>
        </div>
    )
}

export default ProductFormModal;
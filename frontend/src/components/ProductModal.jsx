import { useProducts } from '../context/ProductContext.jsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { notify } from '../utils/notifyToast.js'
import { productSchema, updateProductSchema } from '../../../validation/productSchema.js'
import VariantModal from './VariantModal.jsx'
import { useVariants } from '../hooks/useVariants.js'
import { deleteAlert } from '../utils/deleteAlert.js'

function ProductModal({ productUpdate, onClose, onSubmit }) {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({
        mode: 'onChange',
        resolver: zodResolver(productUpdate ? updateProductSchema : productSchema),
        defaultValues: productUpdate
    })
    const { updateProduct, createProduct } = useProducts()
    const { deleteVariant } = useVariants()
    const [modalVariant, setModalVariant] = useState(false)
    const [variants, setVariants] = useState([])
    const [variantUpdate, setVariantUpdate] = useState()
    const purchasePrice = watch("purchasePrice")
    const salePrice = watch("salePrice")

    useEffect(() => {
        if (productUpdate && productUpdate.variants) {
            setVariants(productUpdate.variants)
        }
    }, [])

    useEffect(() => {
        if (purchasePrice && salePrice && Number(purchasePrice) > Number(salePrice)) {
            notify('warning', 'Esta acción puede generar pérdidas en el sistema!')
        }
    }, [purchasePrice, salePrice])

    useEffect(() => {
        if (productUpdate) reset(productUpdate)
    }, [productUpdate, reset])

    const onValid = async (data) => {
        const fullProduct = {
            ...data,
            variants: variants.length > 0 ? variants : []
        }
        for (const variant of fullProduct.variants) {
            if (variant.image instanceof File) {
                const imageUrl = await uploadImage(variant.image)
                variant.image = imageUrl
            }
        }
        productUpdate
            ? updateProduct(fullProduct, productUpdate)
            : createProduct(fullProduct)
        onSubmit()
    }

    const onInvalid = () => {
        notify('error', 'Por favor ingrese todos los datos')
    }

    const uploadImage = async (file) => {
        const formData = new FormData()
        formData.append('image', file)

        const res = await fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        return data.url
    }

    const onSubmitVariant = (data) => {
        variantUpdate ? setVariants((prev => prev.map(p => p.id === data.id ? data : p))) : setVariants((prev) => [...prev, data])
        setModalVariant(false)
    }

    const handleCreate = () => {
        setVariantUpdate(null)
        setModalVariant(true)
    }

    const handleDelete = (id) => {
        deleteAlert({
            deleteFunction: () => {
                deleteVariant(id)
                setVariants((prev => prev.filter(p => p.id !== id)))
            },
            type: "Variant"
        })
    }
    const handleUpdate = (variant) => {
        setVariantUpdate(variant)
        setModalVariant(true)
    }

    return (
        <div className='flex flex-col h-screen w-screen fixed top-0 left-0' style={{ backgroundColor: 'rgb(0,0,0,0.6)' }}>
            <button className="fixed top-0 right-0" onClick={onClose}>X</button>
            <div className="bg-gray-400">
                <form onSubmit={handleSubmit(onValid, onInvalid)} className="flex flex-col pt-20 mx-10 gap-2">
                    <div className="flex justify-between">
                        <label htmlFor="name">Nombre</label>
                        <div className="flex gap-4">
                            {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                            <input type="text" autoComplete="name" id="name" {...register("name")} />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="purchasePrice">Precio de compra</label>
                        <div className="flex gap-4">
                            {errors.purchasePrice && <span className="text-red-600">{errors.purchasePrice.message}</span>}
                            <input type="number" autoComplete="purchasePrice" id="purchasePrice" {...register("purchasePrice")} />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="salePrice">Precio de venta</label>
                        <div className="flex gap-4">
                            {errors.salePrice && <span className="text-red-600">{errors.salePrice.message}</span>}
                            <input type="number" autoComplete="salePrice" id="salePrice" {...register("salePrice")} />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="brand">Marca</label>
                        <div className="flex gap-4">
                            {errors.brand && <span className="text-red-600">{errors.brand.message}</span>}
                            <input type="text" autoComplete="brand" id="brand" {...register("brand")} />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="description">Descripcion (Opcional)</label>
                        <input type="text" autoComplete="description" id="description" {...register("description")} />
                    </div>


                    <button type="submit">{productUpdate ? 'Actualizar' : 'Crear'}</button>
                </form>

                {modalVariant && <VariantModal onSubmitVariant={onSubmitVariant} variantUpdate={variantUpdate} closeModal={() => { setModalVariant(false) }} />}
                <section className="w-full flex flex-col items-center justify-center m-auto gap-4">
                    {variants.map((variant) => (
                        <div key={variant.code} className="flex items-center justify-center gap-4">
                            <p>Code: {variant.code}</p>
                            <p>Size: {variant.size}</p>
                            <p>Color: {variant.color}</p>
                            <p>Stock: {variant.stock}</p>
                            {variant.image && <img src={typeof variant.image === 'string' ? variant.image : URL.createObjectURL(variant.image)} className="w-20 h-20 object-cover" />}
                            <button onClick={() => { handleUpdate(variant) }}>Editar</button>
                            <button onClick={() => { handleDelete(variant.id) }}>Eliminar</button>
                        </div>
                    ))}
                </section>
            </div>

            {!modalVariant && <button onClick={() => { handleCreate() }} className='bg-blue-600'>Agregar Variante</button>}

        </div>
    )
}

export default ProductModal;
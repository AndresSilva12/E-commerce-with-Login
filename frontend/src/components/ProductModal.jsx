import { useProducts } from '../context/ProductContext.jsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { notify } from '../utils/notifyToast.js'
import { productSchema, updateProductSchema } from '../../../validation/productSchema.js'
import VariantModal from './VariantModal.jsx'
import { useVariants } from '../hooks/useVariants.js'
import { deleteAlert } from '../utils/deleteAlert.js'
import isEqual from 'lodash.isequal'

function ProductModal({ productUpdate, onClose, onSubmit }) {
    const { register, handleSubmit, reset, formState: { errors }, setError, watch } = useForm({
        mode: 'onChange',
        resolver: zodResolver(productUpdate ? updateProductSchema : productSchema),
        defaultValues: productUpdate
    })
    const { updateProduct, createProduct } = useProducts()
    const { deleteVariant, updateVariant, createVariant } = useVariants()
    const [modalVariant, setModalVariant] = useState(false)
    const [variants, setVariants] = useState([])
    const [variantUpdate, setVariantUpdate] = useState()
    const purchasePrice = watch("purchasePrice")
    const salePrice = watch("salePrice")

    useEffect(() => {
        if (productUpdate && productUpdate.variants) {
            const variantsWithLocalId = productUpdate.variants.map(v => ({
                ...v,
                localId: v.id || crypto.randomUUID()
            }))
            setVariants(variantsWithLocalId)
        }
    }, [])

    useEffect(() => {
        if (purchasePrice && salePrice && Number(purchasePrice) > Number(salePrice)) {
            notify('warning', 'Esta acción puede generar pérdidas en el sistema!')
        }
    }, [purchasePrice, salePrice])

    useEffect(() => {
        if (productUpdate) {
            reset(productUpdate)
        }
    }, [productUpdate, reset])

    const onValid = async (data) => {
        const fullProduct = {
            ...data,
            variants: variants.length > 0 ? variants.map(({ localId, ...rest }) => rest) : []
        }
        for (const variant of fullProduct.variants) {
            if (variant.image instanceof File) {
                const imageUrl = await uploadImage(variant.image)
                variant.image = imageUrl
            }
        }
        const result = productUpdate ? await updateProduct(fullProduct, productUpdate, setError) : await createProduct(fullProduct, setError)

        if (!result.success) {
            notify('error', 'Ya existe un producto similar')
            return
        }
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

    const onSubmitVariant = async (data) => {
        if (variantUpdate && 'id' in variantUpdate) {
            const { productId, ...variantWithoutProductId } = variantUpdate
            if (isEqual(data, variantWithoutProductId)) {
                setModalVariant(false)
                return
            }
        }
        if (productUpdate) {
            const imageUrl =
                variantUpdate
                    ? variantUpdate.image === data.image
                        ? data.image
                        : data.image instanceof File
                            ? await uploadImage(data.image)
                            : data.image
                    : data.image instanceof File
                        ? await uploadImage(data.image)
                        : data.image
            const fullVariant = {
                ...data,
                image: imageUrl,
                productId: productUpdate.id
            }
            if (variantUpdate) {
                await updateVariant(fullVariant, variantUpdate)
                setVariants((prev => prev.map(p => p.localId === data.localId ? { ...fullVariant, id: variantUpdate.id } : p)))
            } else {
                const resultVariant = await createVariant(fullVariant)
                if (resultVariant?.id) {
                    setVariants(prev => [...prev.filter(p => p.localId !== data.localId), { ...fullVariant, id: resultVariant.id }])
                }
            }
        } else {
            variantUpdate
                ? setVariants((prev => prev.map(p => p.localId === data.localId ? data : p)))
                : setVariants((prev) => [...prev, data])
        }
        setModalVariant(false)
    }

    const handleCreate = () => {
        setVariantUpdate(null)
        setModalVariant(true)
    }

    const handleDelete = (variant) => {
        deleteAlert({
            deleteFunction: () => {
                if (variant.id) {
                    deleteVariant(variant.id)
                }
                setVariants((prev => prev.filter(p => p.localId !== variant.localId)))
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

                {modalVariant && <VariantModal onSubmitVariant={onSubmitVariant} variants={variants} variantUpdate={variantUpdate} closeModal={() => { setModalVariant(false) }} />}
                <section className="w-full flex flex-col items-center justify-center m-auto gap-4">
                    {variants.map((variant) => (
                        <div key={variant.localId} className="flex items-center justify-center gap-4">
                            {errors.variants && errors.variants[variant.code] && <span className="text-red-600">{errors.variants[variant.code].message}</span>}
                            <p>Code: {variant.code}</p>
                            <p>Size: {variant.size}</p>
                            <p>Color: {variant.color}</p>
                            <p>Stock: {variant.stock}</p>
                            {variant.image && <img src={typeof variant.image === 'string' ? variant.image : URL.createObjectURL(variant.image)} className="w-20 h-20 object-cover" />}
                            <button onClick={() => { handleUpdate(variant) }}>Editar</button>
                            <button onClick={() => { handleDelete(variant) }}>Eliminar</button>
                        </div>
                    ))}
                </section>
            </div>

            {!modalVariant && <button onClick={() => { handleCreate() }} className='bg-blue-600'>Agregar Variante</button>}

        </div>
    )
}

export default ProductModal;
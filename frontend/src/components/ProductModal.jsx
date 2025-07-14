import { useProducts } from '../context/ProductContext.jsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { notify } from '../utils/notifyToast.js'
import { productSchema, updateProductSchema } from '../../../validation/productSchema.js'
import VariantModal from './VariantModal.jsx'
import { useVariants } from '../hooks/useVariants.js'
import { deleteAlert, lossAlert } from '../utils/alerts.js'
import { uploadImage } from '../utils/uploads.js'
import VariantCard from './VariantCard.jsx'

function ProductModal({ productUpdate, onClose, onSubmit }) {
    const { register, handleSubmit, reset, formState: { errors }, setError, watch } = useForm({
        mode: 'onChange',
        resolver: zodResolver(productUpdate ? updateProductSchema : productSchema),
        defaultValues: productUpdate
    })
    const { updateProduct, createProduct } = useProducts()
    const { deleteVariant, submitVariant } = useVariants()
    const [modalVariant, setModalVariant] = useState(false)
    const [variantUpdate, setVariantUpdate] = useState()
    const [variants, setVariants] = useState([])
    const purchasePrice = watch("purchasePrice")
    const salePrice = watch("salePrice")
    const modalRef = useRef(null)

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
        if (productUpdate) {
            reset(productUpdate)
        }
    }, [productUpdate, reset])

    const onValid = async (data) => {
        if (purchasePrice && salePrice && Number(purchasePrice) > Number(salePrice)) {
            const resultAlert = await lossAlert()
            if (!resultAlert.success) return

        }
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
            notify('error', result.error || 'Error al guardar el producto')
            return
        }
        onSubmit()
    }

    const onInvalid = () => {
        notify('error', 'Por favor ingrese todos los datos')
    }


    const onSubmitVariant = async (data) => {
        submitVariant({ data, variantUpdate, productUpdate, setModalVariant, setVariants })
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

    const handleOutsideClick = (e) => {
        if (modalRef.current && e.target === modalRef.current) {
            onClose()
        }
    }

    return (
        <div className='flex flex-col h-screen w-screen fixed top-0 left-0' style={{ backgroundColor: 'rgb(0,0,0,0.6)' }} ref={modalRef} onClick={handleOutsideClick}>
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
                        <VariantCard variant={variant} errors={errors} onEdit={handleUpdate} onDelete={handleDelete} key={variant.localId} />
                    ))}
                </section>
            </div>

            {!modalVariant && <button onClick={() => { handleCreate() }} className='bg-blue-600'>Agregar Variante</button>}

        </div>
    )
}

export default ProductModal;
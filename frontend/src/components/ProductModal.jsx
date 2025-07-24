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
import Modal from "./Modal.jsx";
import { Button, Accordion, Box, Avatar, Span } from "@chakra-ui/react"

function ProductModal({ productUpdate, onSubmit }) {
    const { register, handleSubmit, reset, formState: { errors }, setError, watch } = useForm({
        mode: 'onChange',
        resolver: zodResolver(productUpdate ? updateProductSchema : productSchema),
        defaultValues: productUpdate
    })
    const { updateProduct, createProduct } = useProducts()
    const { deleteVariant, submitVariant } = useVariants()
    const [variantUpdate, setVariantUpdate] = useState()
    const [variants, setVariants] = useState([])
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
        submitVariant({ data, variantUpdate, productUpdate, setVariants })
    }

    const handleCreate = () => {
        setVariantUpdate(null)
    }

    const handleUpdate = (variant) => {
        setVariantUpdate(variant)
    }

    return (
        <div>
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

                    <Button type="submit">{productUpdate ? 'Actualizar' : 'Crear'}</Button>
                </form>

                <section className="w-full flex flex-col items-center justify-center m-auto gap-4">
                    {productUpdate && variants.map((variant) => (
                        <Accordion.Root collapsible key={variant.id} size="sm">
                            <Accordion.Item >
                                <Box display="flex">
                                    <Accordion.ItemTrigger>
                                        <Avatar.Root shape="rounded">
                                            <Avatar.Image src={variant.image} />
                                            <Avatar.Fallback name={productUpdate.name} />
                                        </Avatar.Root>
                                        <Span flex="1">{productUpdate.name} {productUpdate.brand}</Span>
                                        <Accordion.ItemIndicator />
                                    </Accordion.ItemTrigger>
                                    <Modal trigger={<Button variant="solid" onClick={() => { handleUpdate(variant) }}>Editar</Button>}>
                                        {({ closeModal }) => (
                                            <VariantModal onSubmitVariant={(data) => {
                                                onSubmitVariant(data)
                                                closeModal()
                                            }} variants={variants} variantUpdate={variantUpdate} />
                                        )}
                                    </Modal>
                                    <Button variant="ghost" onClick={() => { deleteVariant(variant, setVariants) }}>Eliminar</Button>
                                </Box>
                                <Accordion.ItemContent>

                                </Accordion.ItemContent>
                            </Accordion.Item>
                        </Accordion.Root>
                    ))}
                </section>
            </div>

            <Modal trigger={<button onClick={() => { handleCreate() }} >Agregar Variante</button>}>
                {({ closeModal }) => (
                    <VariantModal onSubmitVariant={(data) => {
                        onSubmitVariant(data)
                        closeModal()
                    }} variants={variants} variantUpdate={variantUpdate} />
                )}
            </Modal>

        </div>
    )
}

export default ProductModal;
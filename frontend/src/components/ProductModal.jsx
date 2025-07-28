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
import { Button, Accordion, Box, Avatar, Span, Field, Fieldset, Input, InputGroup, NumberInput, Text, Stack } from "@chakra-ui/react"

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
            <div>
                <form onSubmit={handleSubmit(onValid, onInvalid)}>
                    <Fieldset.Root size="lg" maxW="md">
                        <Fieldset.Content>
                            <Box display="flex">
                                <Field.Root>
                                    <Field.Label>Name</Field.Label>
                                    <Input {...register("name")} width="200px" />
                                    {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label>Brand</Field.Label>
                                    <Input {...register("brand")} width="200px" />
                                    {errors.brand && <span className="text-red-600">{errors.brand.message}</span>}
                                </Field.Root>
                            </Box>

                            <Box display="flex">
                                <Field.Root>
                                    <Field.Label>Purchase Price</Field.Label>
                                    <NumberInput.Root defaultValue="10" width="200px" {...register("purchasePrice")}>
                                        <NumberInput.Control />
                                        <InputGroup startElement="$">
                                            <NumberInput.Input />
                                        </InputGroup>
                                    </NumberInput.Root>
                                    {errors.purchasePrice && <span className="text-red-600">{errors.purchasePrice.message}</span>}
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label>Sale Price</Field.Label>
                                    <NumberInput.Root defaultValue="10" width="200px" {...register("salePrice")}>
                                        <NumberInput.Control />
                                        <InputGroup startElement="$">
                                            <NumberInput.Input />
                                        </InputGroup>
                                    </NumberInput.Root>
                                    {errors.salePrice && <span className="text-red-600">{errors.salePrice.message}</span>}
                                </Field.Root>
                            </Box>

                            <Field.Root>
                                <Field.Label>Description</Field.Label>
                                <Input {...register("description")} />
                            </Field.Root>

                        </Fieldset.Content>

                        <Button type="submit" alignSelf="flex-start" >
                            {productUpdate ? 'Actualizar' : 'Crear'}
                        </Button>
                    </Fieldset.Root>
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
                                        <Stack gap="1">
                                            <Span flex="1">{productUpdate.name} {productUpdate.brand}</Span>
                                            <Text fontSize="sm" color="fg.muted">Codigo: {variant.code} Size: {variant.size}</Text>
                                            <Text fontSize="sm" color="fg.muted">Color: {variant.color} Stock: {variant.stock}</Text>
                                        </Stack>
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
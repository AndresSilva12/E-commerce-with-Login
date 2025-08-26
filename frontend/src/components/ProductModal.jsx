import { useProducts } from '../context/ProductContext.jsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { notify } from '../utils/notifyToast.js'
import { productSchema, updateProductSchema } from '../../../validation/productSchema.js'
import VariantModal from './VariantModal.jsx'
import { useVariants } from '../hooks/useVariants.js'
import { uploadImage } from '../utils/uploads.js'
import Modal from "./Modal.jsx";
import { useStockEntries } from '../hooks/useStockEntries.js'
import { Button, Accordion, Box, Avatar, Span, Field, Fieldset, Input, InputGroup, NumberInput, Text, Stack } from "@chakra-ui/react"

function ProductModal({ productUpdate, onSubmit }) {
    const { register, handleSubmit, reset, formState: { errors }, setError, watch } = useForm({
        mode: 'onChange',
        resolver: zodResolver(productUpdate ? updateProductSchema : productSchema),
        defaultValues: productUpdate
    })
    const { updateProduct, createProduct, fetchUniqueProduct } = useProducts()
    const { deleteVariant, submitVariant, } = useVariants()
    const [variants, setVariants] = useState([])
    const [variantUpdate, setVariantUpdate] = useState()
    const [purchasePrice, setPurchasePrice] = useState(1)
    const { createEntry } = useStockEntries()

    useEffect(() => {
        if (productUpdate && productUpdate.variants) {
            const variantsWithLocalId = productUpdate.variants.map(v => ({
                ...v,
                localId: v.id || crypto.randomUUID()
            }))
            setVariants(variantsWithLocalId)
        } else {
            setVariants([])
        }
    }, [productUpdate])

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
            notify('error', result.error || 'Error al guardar el producto')
            return
        }

        for (const variant of result.variants) {
            const variantFound = fullProduct.variants.find(v => v.code === variant.code)
            const entryData = {
                items: [{
                    variantId: variant.id,
                    quantity: variantFound.stock,
                    purchasePrice: purchasePrice
                }],
                motive: "Stock Inicial"
            }
            createEntry(entryData)
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
        <Box display="grid" gridTemplateColumns="repeat(2, minmax(0, 1fr))" gap="4">
            <form onSubmit={handleSubmit(onValid, onInvalid)}>
                <Fieldset.Root size="lg" maxW="md">
                    <Fieldset.Content>
                        <Box display="flex">
                            <Field.Root invalid={!!errors.name}>
                                <Box display="flex" justifyContent="space-between" width="full">
                                    <Field.Label>Name</Field.Label>
                                    <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                                </Box>
                                <Input {...register("name")} width="200px" />
                            </Field.Root>

                            <Field.Root invalid={!!errors.brand}>
                                <Box display="flex" justifyContent="space-between" width="full">
                                    <Field.Label>Brand</Field.Label>
                                    <Field.ErrorText>{errors.brand?.message}</Field.ErrorText>
                                </Box>
                                <Input {...register("brand")} width="200px" />
                            </Field.Root>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                            <Field.Root invalid={!!errors.salePrice}>
                                <Box display="flex" justifyContent="space-between" width="full">
                                    <Field.Label>Sale Price</Field.Label>
                                    <Field.ErrorText>{errors.salePrice?.message}</Field.ErrorText>
                                </Box>
                                <NumberInput.Root defaultValue="10" width="200px" {...register("salePrice")}>
                                    <NumberInput.Control />
                                    <InputGroup startElement="$">
                                        <NumberInput.Input />
                                    </InputGroup>
                                </NumberInput.Root>
                            </Field.Root>

                            {!productUpdate && (
                                <Field.Root>
                                    <Box display="flex" justifyContent="space-between" width="full">
                                        <Field.Label>Purchase Price</Field.Label>
                                    </Box>
                                    <NumberInput.Root value={purchasePrice} onValueChange={(e) => { setPurchasePrice(e.value) }} width="200px">
                                        <NumberInput.Control />
                                        <InputGroup startElement="$">
                                            <NumberInput.Input />
                                        </InputGroup>
                                    </NumberInput.Root>
                                </Field.Root>
                            )}
                        </Box>

                        <Field.Root>
                            <Field.Label>Description</Field.Label>
                            <Input {...register("description")} />
                        </Field.Root>

                    </Fieldset.Content>

                    <Box height="200px" overflowY="scroll">
                        {variants && variants.map((variant) => (
                            <Accordion.Root collapsible key={variant.localId} size="sm" onClick={() => { handleUpdate(variant) }}>
                                <Accordion.Item >
                                    <Box display="flex">
                                        <Accordion.ItemTrigger>
                                            <Avatar.Root shape="rounded">
                                                <Avatar.Image src={variant.image} />
                                                <Avatar.Fallback name={variant.code} />
                                            </Avatar.Root>
                                            <Stack gap="1">
                                                {productUpdate && <Span flex="1">{productUpdate.name} {productUpdate.brand}</Span>}
                                                <Text fontSize="sm" color="fg.muted">Codigo: {variant.code} Size: {variant.size}</Text>
                                                <Text fontSize="sm" color="fg.muted">Color: {variant.color} Stock: {variant.stock}</Text>
                                            </Stack>
                                        </Accordion.ItemTrigger>
                                        <Button variant="ghost" onClick={() => { deleteVariant(variant, setVariants) }}>Eliminar</Button>
                                    </Box>
                                    <Accordion.ItemContent>

                                    </Accordion.ItemContent>
                                </Accordion.Item>
                            </Accordion.Root>
                        ))}
                    </Box>
                </Fieldset.Root>
                <Box display="flex" width="full" paddingY="10px" justifyContent="space-between">
                    <Button type="submit" alignSelf="flex-start" >
                        {productUpdate ? 'Actualizar' : 'Crear'}
                    </Button>
                    <Button type="button" onClick={() => { handleCreate() }} variant="surface" >Nueva Variante</Button>
                </Box>
            </form>
            <VariantModal onSubmitVariant={(data) => { onSubmitVariant(data) }} variants={variants} variantUpdate={variantUpdate} productUpdate={productUpdate} />
        </Box>
    )
}

export default ProductModal;
import { Button, Accordion, Box, Avatar, Span, Field, Fieldset, Input, InputGroup, NumberInput, Select, Text, Stack, Portal, createListCollection } from "@chakra-ui/react"
import { productSchema, updateProductSchema } from '../../../validation/productSchema.js'
import { useStockEntries } from '../hooks/useStockEntries.js'
import { useCategories } from '../hooks/useCategories.js'
import { useProducts } from '../context/ProductContext.jsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useVariants } from '../hooks/useVariants.js'
import { uploadImage } from '../utils/uploads.js'
import { toast } from "../utils/notifyToast.js";
import VariantModal from './VariantModal.jsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import isEqual from 'lodash.isequal'

function ProductModal({ productUpdate, onSubmit, closeModal }) {
    const { register, handleSubmit, reset, formState: { errors }, setError } = useForm({
        mode: 'onChange',
        resolver: zodResolver(productUpdate ? updateProductSchema : productSchema),
        defaultValues: productUpdate
    })
    const { updateProduct, createProduct } = useProducts()
    const { createVariant, updateVariant } = useVariants()
    const { getCategories, categories } = useCategories()
    const [variants, setVariants] = useState([])
    const [variantUpdate, setVariantUpdate] = useState()
    const [purchasePrice, setPurchasePrice] = useState(1)
    const [categoriesCollection, setCategoriesCollection] = useState()
    const [categorySelected, setCategorySelected] = useState()
    const [categorySelectedName, setCategorySelectedName] = useState()
    const { createEntry } = useStockEntries()

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        const categoriesFetch = await getCategories()
        const collection = createListCollection({
            items: categoriesFetch.map((category) => ({
                label: category.name,
                value: category.id,
            })),
        })
        setCategoriesCollection(collection)
    }

    useEffect(() => {
        if (productUpdate && productUpdate.variants) {
            const variantsWithLocalId = productUpdate.variants
                .filter(v => !v.disabled)
                .map(v => ({
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

    useEffect(() => {
        if (productUpdate?.categoryId && categoriesCollection?.items) {
            const categoryExist = categoriesCollection.items.find(c => c.value === productUpdate.categoryId)
            if (categoryExist) {
                setCategorySelected(productUpdate.categoryId)
                setCategorySelectedName(categoryExist.label)
            }
        }
    }, [productUpdate, categoriesCollection])

    const onValid = async (data) => {
        const fullProduct = {
            ...data,
            categoryId: Array.isArray(categorySelected) ? categorySelected[0] : categorySelected,
            variants: variants.length > 0 ? variants.map(({ localId, ...rest }) => rest) : []
        }
        for (const variant of fullProduct.variants) {
            if (variant.image instanceof File) {
                const imageUrl = await uploadImage(variant.image)
                variant.image = imageUrl
            }
        }
        const result = productUpdate
            ? await updateProduct(fullProduct, productUpdate, setError)
            : await createProduct(fullProduct, setError)

        if (!result.success) {
            return { error: "Error interno del servidor" }
        }

        const variantes = productUpdate ? result.product.variants : result.variants
        for (const variant of variantes) {
            const variantFound = fullProduct.variants.find(v => v.code === variant.code)
            const entryData = {
                items: [{
                    variantId: variant.id,
                    quantity: variantFound.stock,
                    purchasePrice: purchasePrice
                }],
                motive: "Stock Inicial",
                total: variantFound.stock * purchasePrice
            }
            createEntry(entryData)
        }
        onSubmit()
        closeModal()
    }

    const onInvalid = () => {
        toast("por favor ingrese todos los datos", "error")
    }


    const onSubmitVariant = async (data) => {
        let newVariant
        const resolveImage = async (image, prevImage) => {
            if (image === prevImage) return image
            if (image instanceof File) return await uploadImage(image)
            return image
        }

        if (variantUpdate && 'id' in variantUpdate) {
            const { productId, ...variantWithoutProductId } = variantUpdate
            if (isEqual(data, variantWithoutProductId)) {
                return
            }
        }

        if (productUpdate) {
            const fullVariant = {
                ...data,
                productId: productUpdate.id,
                image: await resolveImage(data.image, variantUpdate?.image)
            }

            if (variantUpdate) {
                newVariant = await updateVariant(fullVariant, variantUpdate)
                setVariants(prev => prev.map(v => v.id === variantUpdate.id ? newVariant : v))
            }
            else {
                newVariant = await createVariant(fullVariant)
                setVariants(prev => [...prev, newVariant])
            }
        }
        else {
            if (variantUpdate) {
                setVariants(prev => prev.map(v => v.localId === data.localId ? data : v))
            }
            else {
                setVariants(prev => [...prev, { ...data, localId: crypto.randomUUID() }])
            }
        }
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

                        {categoriesCollection && (
                            <Select.Root
                                value={categorySelected ? [{ value: categorySelected }] : []}
                                onValueChange={({ value }) => {
                                    setCategorySelected(value)
                                    const category = categoriesCollection.items.find(c => c.value === value[0])
                                    setCategorySelectedName(category?.label || '')
                                }}
                                collection={categoriesCollection}>
                                <Select.HiddenSelect />
                                <Select.Control>
                                    <Select.Trigger>
                                        <Select.ValueText>
                                            {categorySelectedName || 'Seleccione una categoria'}
                                        </Select.ValueText>
                                    </Select.Trigger>
                                    <Select.IndicatorGroup>
                                        <Select.Indicator />
                                    </Select.IndicatorGroup>
                                </Select.Control>
                                <Portal>
                                    <Select.Positioner>
                                        <Select.Content zIndex="99999">
                                            {categoriesCollection?.items?.map((category) => (
                                                <Select.Item item={category} key={category.value}>
                                                    {category.label}
                                                    <Select.ItemIndicator />
                                                </Select.Item>
                                            ))}
                                        </Select.Content>
                                    </Select.Positioner>
                                </Portal>
                            </Select.Root>
                        )}

                        <Field.Root>
                            <Field.Label>Description</Field.Label>
                            <Input {...register("description")} />
                        </Field.Root>

                    </Fieldset.Content>

                    <Box height="200px" overflowY="scroll">
                        {variants && variants.map((variant, index) => (
                            <Accordion.Root collapsible key={index} size="sm" onClick={() => { handleUpdate(variant) }}>
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
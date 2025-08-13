import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useProducts } from "../context/ProductContext";
import ProductModal from "../components/ProductModal";
import VariantModal from '../components/VariantModal'
import { deleteAlert } from "../utils/alerts";
import { Button, Card, Image, Text, Grid, Accordion, Span, Select, Portal, createListCollection, HStack, Field, Badge, Avatar, Box, Float, NumberInput, IconButton } from "@chakra-ui/react"
import Modal from "../components/Modal";
import { useVariants } from '../hooks/useVariants.js'
import { useCart } from "../context/CartContext";
import { notify } from "../utils/notifyToast.js";
import { useForm } from "react-hook-form";
import { useStockEntries } from "../hooks/useStockEntries";

export function ModalStockUpdate({ variantUpdate }) {
    const { handleSubmit } = useForm()
    const [purchasePrice, setPurchasePrice] = useState(1)
    const [motive, setMotive] = useState("")
    const [stockEntry, setStockEntry] = useState(1)
    const { createEntry } = useStockEntries()

    const motives = createListCollection({
        items: [
            { label: "Stock Inicial", value: "Stock Inicial" },
            { label: "Devolución", value: "Devolucion" },
            { label: "Reingreso", value: "Reingreso" },
        ],
    })

    const onValid = async () => {
        const entryData = {
            items: [{
                variantId: variantUpdate.id,
                quantity: Number(stockEntry),
                purchasePrice: Number(purchasePrice)
            }],
            motive: String(motive)
        }
        await createEntry(entryData)
        console.log(entryData)
    }

    return (
        <form onSubmit={handleSubmit(onValid)}>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="2">
                <Box display="flex" gap="2">
                    <Field.Root >
                        <Field.Label>Cant. Ingreso</Field.Label>
                        <NumberInput.Root value={stockEntry} onValueChange={(e) => { setStockEntry(e.value) }}>
                            <NumberInput.Control />
                            <NumberInput.Input />
                        </NumberInput.Root>
                    </Field.Root>
                    <Field.Root >
                        <Field.Label>Precio de compra</Field.Label>
                        <NumberInput.Root value={purchasePrice} onValueChange={(e) => { setPurchasePrice(e.value) }}>
                            <NumberInput.Control />
                            <NumberInput.Input />
                        </NumberInput.Root>
                    </Field.Root>
                </Box>
                <Field.Root alignItems="center">
                    <Select.Root collection={motives} value={motive} defaultValue={["Reingreso"]} onValueChange={(e) => { setMotive(e.value) }} size="sm" width="320px">
                        <Select.HiddenSelect />
                        <Select.Label>Motivo</Select.Label>
                        <Select.Control>
                            <Select.Trigger>
                                <Select.ValueText placeholder="Motivo" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                                <Select.Indicator />
                            </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal color="red">
                            <Select.Positioner>
                                <Select.Content zIndex="9999">
                                    {motives.items.map((motive) => (
                                        <Select.Item item={motive} key={motive.value}>
                                            {motive.label}
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Portal>
                    </Select.Root>
                </Field.Root>
                <Button type="submit" width="1/5">Actualizar</Button>
            </Box>
        </form>
    )
}

function ProductsPage() {
    const [productUpdate, setProductUpdate] = useState(null)
    const { products, deleteProduct } = useProducts()
    const { deleteVariant, submitVariant, setVariants, variants } = useVariants()
    const [variantUpdate, setVariantUpdate] = useState()
    const { addToCart } = useCart()

    useEffect(() => {
        if (productUpdate && productUpdate.variants) {
            const variantsWithLocalId = productUpdate.variants.map(v => ({
                ...v,
                localId: v.id || crypto.randomUUID()
            }))
            setVariants(variantsWithLocalId)
        }
    }, [])


    const onSubmit = () => {
        setProductUpdate(null)
    }

    const handleUpdate = (product) => {
        setProductUpdate(product)
    }

    const handleDelete = (id) => {
        deleteAlert({ deleteFunction: () => deleteProduct(id), type: "Product" })
    }

    const handleCreate = () => {
        setProductUpdate(null)
    }

    const onSubmitVariant = async (data) => {
        submitVariant({ setVariants, productUpdate, variantUpdate, data })
    }

    const handleVariantUpdate = (variant, product) => {
        setVariantUpdate(variant)
        setProductUpdate(product)
    }

    const handleCart = (variant) => {
        const item = products.find((product) => product.id === variant.productId)
        const onlyVariant = item.variants.find((v) => v.id === variant.id)
        const fullItem = {
            ...item,
            variants: {
                ...onlyVariant,
                quantity: 1,
                unitPrice: item.salePrice
            }
        }
        addToCart(fullItem)
        notify("success", "producto agregado al carrito!")
    }

    return (
        <>
            {products.map((product) => (
                <Accordion.Root collapsible key={product.id} size="sm" padding="10px">
                    <Accordion.Item >
                        <Box display="flex" gap="4">
                            <Accordion.ItemTrigger>
                                <Avatar.Root shape="rounded">
                                    {product.variants[0] &&
                                        <Avatar.Image src={product.variants[0].image} />
                                    }
                                    <Avatar.Fallback name={product.name} />
                                </Avatar.Root>
                                <Span flex="1">{product.name} {product.brand}</Span>
                                <Accordion.ItemIndicator />
                            </Accordion.ItemTrigger>
                            <Modal trigger={<Button variant="solid" onClick={() => { handleUpdate(product) }}>Editar</Button>}>
                                {({ closeModal }) => (
                                    <ProductModal productUpdate={productUpdate} onSubmit={() => {
                                        onSubmit()
                                        closeModal()
                                    }} />
                                )}
                            </Modal>
                            <Button colorPalette="red" onClick={() => { handleDelete(product.id) }}>Eliminar</Button>
                        </Box>
                        <Accordion.ItemContent>
                            <Grid templateColumns="repeat(8, 1fr)" gap="4" paddingY="16px">
                                {product.variants && product.variants.map((variant) => (
                                    <Box display="inline-block" pos="relative" key={variant.id}>
                                        <Card.Root maxW="200px" size="sm" overflow="hidden" >
                                            <Image src={variant.image} h="100px" w="400px" fit="contain" />
                                            <Card.Body>
                                                <Card.Title>{product.name} {product.brand}</Card.Title>
                                                <Card.Description>{product.description}</Card.Description>
                                                <HStack mt="1">
                                                    <Badge>Talle {variant.size}</Badge>
                                                    <Badge>{variant.color}</Badge>
                                                </HStack>
                                                <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">${new Intl.NumberFormat("es-AR").format(product.salePrice)}</Text>
                                            </Card.Body>
                                            <Card.Footer display="flex" flexDirection="column" justifyContent="center">
                                                <Box display="flex" justifyContent="center" gap="4">
                                                    <Modal trigger={<Button type="button" width="50px" flex="1" onClick={() => handleVariantUpdate(variant, product)}>Editar</Button>}>
                                                        {({ closeModal }) => (
                                                            <VariantModal onSubmitVariant={(data) => {
                                                                onSubmitVariant(data)
                                                                closeModal()
                                                            }} variants={variants} variantUpdate={variantUpdate} />
                                                        )}
                                                    </Modal>
                                                    <Button colorPalette="red" flex="1" onClick={() => deleteVariant(variant, setVariants)}>Eliminar</Button>
                                                </Box>
                                                <Box gap="2" display="flex" justifyContent="center">
                                                    <NumberInput.Root value={variant.stock} unstyled spinOnPress={false} >
                                                        <HStack>
                                                            <Button colorPalette="green" onClick={() => { handleCart(variant) }}>Cart</Button>
                                                            <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />
                                                            <Modal trigger={
                                                                <NumberInput.Control onClick={() => setVariantUpdate(variant)}>
                                                                    <IconButton variant="outline" size="sm">+ Stock</IconButton>
                                                                </NumberInput.Control>
                                                            }
                                                            >
                                                                <ModalStockUpdate variantUpdate={variantUpdate} />
                                                            </Modal>
                                                        </HStack>
                                                    </NumberInput.Root>
                                                </Box>

                                            </Card.Footer>
                                        </Card.Root>
                                        <Float placement="top-end" zIndex="banner">
                                            <Badge size="sm" variant="solid" colorPalette={variant.stock > 5 ? "teal" : "red"}>
                                                Stock: {variant.stock}
                                            </Badge>
                                        </Float>
                                    </Box>
                                ))}
                            </Grid>
                        </Accordion.ItemContent>
                    </Accordion.Item>
                </Accordion.Root >
            ))
            }

            <Modal trigger={<Button position="fixed" right="0" bottom="0" size="lg" margin="1rem" colorPalette="teal" onClick={handleCreate}>+</Button>}>
                {({ closeModal }) => (
                    <ProductModal productUpdate={productUpdate} onSubmit={() => {
                        onSubmit()
                        closeModal()
                    }} />
                )}
            </Modal>

            <ToastContainer />
        </>
    )
}

export default ProductsPage;
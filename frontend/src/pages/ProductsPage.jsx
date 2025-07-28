import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useProducts } from "../context/ProductContext";
import ProductModal from "../components/ProductModal";
import VariantModal from '../components/VariantModal'
import { deleteAlert } from "../utils/alerts";
import { Button, Card, Image, Text, Grid, Accordion, Span, HStack, Badge, Avatar, Box } from "@chakra-ui/react"
import Modal from "../components/Modal";
import { useVariants } from '../hooks/useVariants.js'

function ProductsPage() {
    const [productUpdate, setProductUpdate] = useState(null)
    const { products, deleteProduct } = useProducts()
    const { deleteVariant, submitVariant } = useVariants()
    const [variants, setVariants] = useState([])
    const [variantUpdate, setVariantUpdate] = useState()

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
        submitVariant({ data, variantUpdate, productUpdate, setVariants })
    }

    const handleVariantUpdate = (variant) => {
        setVariantUpdate(variant)
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
                            <Button variant="ghost" onClick={() => { handleDelete(product.id) }}>Eliminar</Button>
                        </Box>
                        <Accordion.ItemContent>
                            <Grid templateColumns="repeat(8, 1fr)" gap="4" paddingY="16px">
                                {product.variants && product.variants.map((variant) => (

                                    <Card.Root maxW="200px" size="sm" overflow="hidden" key={variant.id} >
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
                                        <Card.Footer display="flex" justifyContent="center">
                                            <Modal trigger={<Button width="50px" flex="1" onClick={() => handleVariantUpdate(variant)}>Editar</Button>}>
                                                {({ closeModal }) => (
                                                    <VariantModal onSubmitVariant={(data) => {
                                                        onSubmitVariant(data)
                                                        closeModal()
                                                    }} variants={variants} variantUpdate={variantUpdate} />
                                                )}
                                            </Modal>
                                            <Button flex="1" onClick={() => deleteVariant(variant, setVariants)}>Eliminar</Button>
                                        </Card.Footer>
                                    </Card.Root>
                                ))}
                            </Grid>
                        </Accordion.ItemContent>
                    </Accordion.Item>
                </Accordion.Root>
            ))}

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
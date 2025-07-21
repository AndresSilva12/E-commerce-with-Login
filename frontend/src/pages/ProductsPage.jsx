import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useProducts } from "../context/ProductContext";
import ProductModal from "../components/ProductModal";
import { deleteAlert } from "../utils/alerts";
import { Button, Card, Image, Text, Grid, Accordion, Span, HStack, Badge, Avatar } from "@chakra-ui/react"

function ProductsPage() {
    const [modal, setModal] = useState(false)
    const [productUpdate, setProductUpdate] = useState(null)
    const { products, deleteProduct } = useProducts()

    const onSubmit = () => {
        setProductUpdate(null)
        setModal(false)
    }

    const handleUpdate = (product) => {
        setProductUpdate(product)
        setModal(true)
    }

    const handleDelete = (id) => {
        deleteAlert({ deleteFunction: () => deleteProduct(id), type: "Product" })
    }

    const handleCreate = () => {
        setProductUpdate(null)
        setModal(true)
    }

    return (
        <>

            {products.map((product) => (
                <Accordion.Root collapsible key={product.id}>
                    <Accordion.Item >
                        <Accordion.ItemTrigger>
                            <Avatar.Root shape="rounded">
                                <Avatar.Image src={product.variants[0].image} />
                                <Avatar.Fallback name={product.name} />
                            </Avatar.Root>
                            <Span flex="1">{product.name} {product.brand}</Span>
                            <Accordion.ItemIndicator />
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent>
                            <Grid templateColumns="repeat(3, 1fr)" gap="6" >
                                {product.variants && product.variants.map((variant) => (

                                    <Card.Root maxW="sm" size="sm" overflow="hidden" key={variant.id} >
                                        <Image src={variant.image} h="auto" w="full" fit="contain" />
                                        <Card.Body gap="2">
                                            <Card.Title>{product.name} {product.brand}</Card.Title>
                                            <Card.Description>{product.description}</Card.Description>
                                            <HStack mt="1">
                                                <Badge>Talle {variant.size}</Badge>
                                                <Badge>{variant.color}</Badge>
                                            </HStack>
                                            <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">${new Intl.NumberFormat("es-AR").format(product.purchasePrice)}</Text>
                                        </Card.Body>
                                        <Card.Footer gap="2">
                                            <Button variant="solid" onClick={() => { handleUpdate(product) }}>Editar</Button>
                                            <Button variant="ghost" onClick={() => { handleDelete(product.id) }}>Eliminar</Button>
                                        </Card.Footer>
                                    </Card.Root>
                                ))}
                            </Grid>
                        </Accordion.ItemContent>
                    </Accordion.Item>
                </Accordion.Root>
            ))}

            <button className="fixed bottom-0 right-0 p-2 bg-blue-600 rounded-full" onClick={handleCreate}>+</button>
            {modal && (<ProductModal productUpdate={productUpdate} onClose={() => { setModal(false) }} onSubmit={() => { onSubmit() }} />)}

            <ToastContainer />
        </>
    )
}

export default ProductsPage;
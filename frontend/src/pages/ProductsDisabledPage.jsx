import { Button, Card, Image, Text, Grid, HStack, Badge, Box } from "@chakra-ui/react"
import { useVariants } from "../hooks/useVariants";
import Modal from "../components/Modal";
import { useEffect } from "react";

function ProductsDisabledPage() {
    const { enableVariant, variantsDisabled, fetchVariantsDisabled } = useVariants()

    useEffect(() => {
        fetchVariantsDisabled()
    }, [])

    const handleEnable = async (id, closeModal) => {
        await enableVariant(id)
        closeModal()
    }

    return (
        <Grid templateColumns="repeat(5, 1fr)" gap="4" paddingTop="120px">
            {Array.isArray(variantsDisabled) && variantsDisabled.map((variant) => (
                <Card.Root width="200px" size="sm" overflow="hidden" key={variant.id}>
                    <Image src={variant.image} h="100px" w="400px" fit="contain" />
                    <Card.Body>
                        <Card.Title>{variant.product.name} {variant.product.brand}</Card.Title>
                        <Card.Description>{variant.product.description}</Card.Description>
                        <HStack mt="1">
                            <Badge>Talle {variant.size}</Badge>
                            <Badge>{variant.color}</Badge>
                        </HStack>
                        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">${new Intl.NumberFormat("es-AR").format(variant.product.salePrice)}</Text>
                    </Card.Body>
                    <Card.Footer display="flex" flexDirection="column" justifyContent="center">

                        <Box display="flex" justifyContent="center" gap="4">

                            <Modal trigger={<Button colorPalette="red" flex="1" >Habilitar</Button>}>
                                {({ closeModal }) => (
                                    <>
                                        <h2 >Está seguro que desea habilitar esta variante?</h2>
                                        <Button onClick={() => { handleEnable(variant.id, closeModal) }}>Habilitar</Button>
                                    </>
                                )}
                            </Modal>
                        </Box>

                    </Card.Footer>
                </Card.Root>
            ))}
        </Grid>
    )
}

export default ProductsDisabledPage;
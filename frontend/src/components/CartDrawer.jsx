import { Button, Card, Image, Text, Box, CloseButton, Drawer, Portal, NumberInput, Field, Select, createListCollection, HStack, Badge } from "@chakra-ui/react"
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { LuTrash2 } from "react-icons/lu";

function CartDrawer({ trigger }) {
    const [openCart, setOpenCart] = useState(false)
    const { cart, setCart, clearCart, buyCart, removeFromCart, totalPrice } = useCart()
    const [motive, setMotive] = useState("")

    const handleUpdateQuantity = (q, cartItemId) => {
        setCart((prev) => prev.map((p) => (p.variants.id === cartItemId
            ? { ...p, variants: { ...p.variants, quantity: Number(q) } }
            : p
        )))
    }

    const motives = createListCollection({
        items: [
            { label: "Venta", value: "Venta" },
            { label: "Dañado", value: "Dañado" },
        ],
    })

    return (
        <Drawer.Root open={openCart} onOpenChange={(e) => setOpenCart(e.open)}>
            <Drawer.Trigger asChild>
                {trigger}
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title>Carrito</Drawer.Title>
                            <Button variant="outline" onClick={() => { clearCart() }}>Limpiar Carrito</Button>
                        </Drawer.Header>
                        <Drawer.Body paddingX="4">
                            <Box display="flex" flexDirection="column" gap="4" height="full">
                                {cart && cart.map((cartItem) => (
                                    <Card.Root flexDirection="row" overflow="hidden" maxW="xs" justifyContent="space-between">
                                        <Image src={cartItem.variants.image} h="full" w="2/6" fit="contain" />
                                        <Box display="flex" justifyContent="space-between" w="4/6" marginLeft="8px">
                                            <Card.Body padding="0px">
                                                <Card.Title>{cartItem.name}</Card.Title>
                                                <Card.Description>{cartItem.brand}</Card.Description>
                                                <HStack>
                                                    <Badge>{cartItem.variants.size}</Badge>
                                                    <Badge>{cartItem.variants.color}</Badge>
                                                </HStack>
                                            </Card.Body>
                                            <Card.Footer display="flex" flexDirection="column" padding="0px">
                                                <Field.Root invalid={cartItem.variants.stock < cartItem.variants.quantity || cartItem.variants.quantity <= 0}>
                                                    <NumberInput.Root
                                                        maxW="70px"
                                                        value={cartItem.variants.quantity}
                                                        onValueChange={(e) => handleUpdateQuantity(e.value, cartItem.variants.id)}
                                                    >
                                                        <NumberInput.Control />
                                                        <NumberInput.Input />
                                                    </NumberInput.Root>
                                                    <Field.ErrorText>{cartItem.variants.quantity <= 0 ? 'Debe llevar almenos 1' : 'Cantidad por encima del stock disponible'}</Field.ErrorText>
                                                </Field.Root>
                                                <Button onClick={() => removeFromCart(cartItem.variants.id)}>
                                                    <LuTrash2 />
                                                </Button>
                                            </Card.Footer>
                                        </Box>
                                    </Card.Root>
                                ))}
                                {/* <Box size="sm" height="2/12" key={cartItem.variants.id} flexDirection="row" justifyContent="space-between" alignItems="center" display="flex">
                                </Box> */}
                            </Box>
                        </Drawer.Body>
                        <Drawer.Footer display="flex" flexDirection="column">
                            <Select.Root collection={motives} value={motive} defaultValue={["Venta"]} onValueChange={(e) => { setMotive(e.value) }} size="sm" width="320px">
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
                            <Box display="flex" width="full" justifyContent="space-between" alignItems="center">
                                <Text textStyle="lg" color="green" fontWeight="medium">Total $ {new Intl.NumberFormat("es-AR").format(totalPrice)}</Text>
                                <Button onClick={() => { buyCart(motive) }}>Comprar Carrito</Button>
                            </Box>
                        </Drawer.Footer>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}

export default CartDrawer;
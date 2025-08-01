import { Button, Image, Text, Box, CloseButton, Drawer, Portal, NumberInput, Field } from "@chakra-ui/react"
import { useCart } from "../context/CartContext";
import { useState } from "react";

function CartDrawer({ trigger }) {
    const [openCart, setOpenCart] = useState(false)
    const { cart, setCart, clearCart, buyCart, removeFromCart, totalPrice } = useCart()

    const handleUpdateQuantity = (q, cartItemId) => {
        setCart((prev) => prev.map((p) => (p.variants.id === cartItemId
            ? { ...p, variants: { ...p.variants, quantity: Number(q) } }
            : p
        )))
    }

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
                        <Drawer.Body paddingX="0">
                            <Box display="flex" flexDirection="column" gap="4" height="full">
                                {cart && cart.map((cartItem) => (
                                    <Box size="sm" height="2/12" key={cartItem.variants.id} flexDirection="row" justifyContent="space-between" alignItems="center" display="flex">
                                        <Image src={cartItem.variants.image} h="full" w="120px" fit="contain" />
                                        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                                            <Text size="md">{cartItem.name} {cartItem.brand}</Text>
                                            <Box>
                                                <Text>{cartItem.variants.code}</Text>
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
                                            </Box>
                                        </Box>
                                        <Button onClick={() => removeFromCart(cartItem.variants.id)}>Quitar</Button>
                                    </Box>
                                ))}
                            </Box>
                        </Drawer.Body>
                        <Drawer.Footer>
                            <Text textStyle="lg" color="green" fontWeight="medium">Total $ {new Intl.NumberFormat("es-AR").format(totalPrice)}</Text>
                            <Button onClick={() => { buyCart() }}>Comprar Carrito</Button>
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
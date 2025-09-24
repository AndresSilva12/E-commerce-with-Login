import { useSales } from "../hooks/useSales.js";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "../utils/notifyToast.js";

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const { createSale } = useSales()

    useEffect(() => {
        let total = 0
        for (const cartItem of cart) {
            total += cartItem.salePrice * cartItem.variants.quantity
        }
        setTotalPrice(total)
    }, [cart])

    const addToCart = async (item) => {
        const cartItemExist = cart.find((i) => i.variants.id === item.variants.id)
        if (!cartItemExist) {
            setCart((prev) => [...prev, item])
        } else {
            setCart((prev) => prev.map((i) => i.variants.id === item.variants.id ? { ...i, variants: { ...i.variants, quantity: i.variants.quantity + 1 } } : i))
        }
    }

    const buyCart = async (motive) => {
        const cartItems = []
        for (const item of cart) {
            if (item.variants.quantity > item.variants.stock) {
                toast("Compra cancelada. Cantidad por encima del stock disponible", "error")
                return
            }
            if (item.variants.quantity <= 0) {
                toast("Compra cancelada. Debe llevar almenos 1 unidad", "error")
                return
            }
            const newItem = {
                variantId: item.variants.id,
                quantity: item.variants.quantity,
                unitPrice: item.variants.unitPrice
            }
            cartItems.push(newItem)
        }
        /* const cartItems = cart.map((cartItem) => (
            {
                variantId: cartItem.variants.id,
                quantity: cartItem.variants.quantity,
                unitPrice: cartItem.variants.unitPrice
            }
        )) */
        const cartForSale = {
            totalPrice: totalPrice,
            items: cartItems,
            motive: String(motive)
        }
        createSale(cartForSale)
        setCart([])
    }

    const removeFromCart = async (itemRemovedId) => {
        setCart((prev) => (prev.filter((i) => i.variants.id !== itemRemovedId)))
    }

    const clearCart = async () => {
        setCart([])
    }

    return (
        <CartContext.Provider value={{ cart, setCart, buyCart, addToCart, removeFromCart, clearCart, totalPrice }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}
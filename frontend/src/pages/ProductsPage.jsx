import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useProducts } from "../context/ProductContext";
import ProductModal from "../components/ProductModal";
import VariantModal from '../components/VariantModal'
import { deleteAlert } from "../utils/alerts";
import { Button, Card, Image, Text, Grid, GridItem, Checkbox, Select, Portal, InputGroup, Stack, Code, createListCollection, Slider, HStack, Field, Badge, Box, Float, NumberInput, IconButton, Container } from "@chakra-ui/react"
import Modal from "../components/Modal";
import { useVariants } from '../hooks/useVariants.js'
import { useCart } from "../context/CartContext";
import { notify } from "../utils/notifyToast.js";
import { useForm } from "react-hook-form";
import { useStockEntries } from "../hooks/useStockEntries";
import SearchBar from "../components/SearchBar";

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
    const [filters, setFilters] = useState({})
    const [priceMin, setPriceMin] = useState(0)
    const [priceMax, setPriceMax] = useState(0)
    const [availableFilters, setAvailableFilters] = useState({
        colors: [],
        sizes: [],
        brands: []
    })
    const [filtersChecked, setFiltersChecked] = useState({
        colors: [],
        sizes: [],
        brands: []
    })
    const [sortBy, setSortBy] = useState()
    const { addToCart } = useCart()

    useEffect(() => {
        const fetchSearch = async () => {
            const query = new URLSearchParams(filters).toString()
            const res = await fetch(`http://localhost:3000/api/variants?${query}`)
            const data = await res.json()
            setVariants(data.variants)
            setAvailableFilters({
                colors: data.filters.colors,
                sizes: data.filters.sizes,
                brands: data.filters.brands
            })
        }
        fetchSearch()
    }, [filters])

    useEffect(() => {
        if (productUpdate && productUpdate.variants) {
            const variantsWithLocalId = productUpdate.variants.map(v => ({
                ...v,
                localId: v.id || crypto.randomUUID()
            }))
            setVariants(variantsWithLocalId)
        }
    }, [])

    const sorts = createListCollection({
        items: [
            { label: "Precio (Menor a mayor)", value: "price-asc" },
            { label: "Precio (Mayor a menor)", value: "price-desc" },
            { label: "Nombre (A - Z)", value: "name-asc" },
            { label: "Nombre (Z - A)", value: "name-desc" },
        ],
    })

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

    const debounce = (fn, delay) => {
        let timeout
        return (...args) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => fn(...args), delay)
        }
    }

    const handleChange = debounce((e) => {
        const value = e.target.value
        setFilters((prev) => ({ ...prev, name: value }))
    }, 300)

    const handleCheckBrand = async (brand, checked) => {
        if (checked.checked) {
            setFilters((prev) => ({ ...prev, brand: brand }))
            setFiltersChecked((prev) => ({ ...prev, brands: brand }))
        }
        else {
            setFilters((prev) => {
                const newFilter = { ...prev }
                delete newFilter.brand
                return newFilter
            })
            setFiltersChecked((prev) => ({ ...prev, brands: [] }))
        }
    }

    const handleCheckSize = (size, checked) => {
        if (checked.checked) {
            setFilters((prev) => ({ ...prev, size: size }))
            setFiltersChecked((prev) => ({ ...prev, sizes: size }))
        }
        else {
            setFilters((prev) => {
                const newFilter = { ...prev }
                delete newFilter.size
                return newFilter
            })
            setFiltersChecked((prev) => ({ ...prev, sizes: [] }))
        }
    }

    const handleCheckColor = (color, checked) => {
        if (checked.checked) {
            setFilters((prev) => ({ ...prev, color: color }))
            setFiltersChecked((prev) => ({ ...prev, colors: color }))
        }
        else {
            setFilters((prev) => {
                const newFilter = { ...prev }
                delete newFilter.color
                return newFilter
            })
            setFiltersChecked((prev) => ({ ...prev, colors: [] }))
        }
    }

    const handleChangePrice = () => {
        if (priceMin > 0) {
            setFilters((prev) => ({ ...prev, priceMin: priceMin }))
        }
        if (priceMax > priceMin) {
            setFilters((prev) => ({ ...prev, priceMax: priceMax }))
        }
    }

    const handleSetPrice = (price, value) => {
        if (price === "priceMin") {
            if (value <= 0) {
                setPriceMin()
                setFilters((prev) => {
                    const newFilter = { ...prev }
                    delete newFilter.priceMin
                    return newFilter
                })
            } else {
                setPriceMin(value)
            }
        } else {
            if (value <= 0) {
                setPriceMax()
                setFilters((prev) => {
                    const newFilter = { ...prev }
                    delete newFilter.priceMax
                    return newFilter
                })
            } else {
                setPriceMax(value)
            }
        }
    }

    const handleChangeSort = (value) => {
        const valueClear = value.toString()
        const valueSplit = valueClear.split("-")
        if (filters.sortBy != null) {
            setFilters((prev) => {
                const newFilter = { ...prev }
                delete newFilter.sortBy
                delete newFilter.sortOrder
                newFilter.sortBy = valueSplit[0]
                newFilter.sortOrder = valueSplit[1]
                return newFilter
            })
        } else {
            console.log(valueSplit[0], valueSplit[1])
            setFilters((prev) => ({ ...prev, sortBy: valueSplit[0], sortOrder: valueSplit[1] }))
        }
    }

    return (
        <>
            <Grid templateColumns="repeat(8, 1fr)" templateRows="repeat(10, 1fr)">
                <GridItem rowSpan={10} colSpan={1} padding="4" bg="black" display="flex" flexDirection="column" gap="4" position="fixed" top="50px" zIndex="50">
                    <Stack textAlign="initial">
                        <Text textStyle="lg" fontWeight="medium">Marca</Text>
                        <Box display="flex" flexDirection="column" justifyContent="center">
                            {availableFilters.brands.map((brand, index) => (
                                <Checkbox.Root key={index} onCheckedChange={(checked) => handleCheckBrand(brand, checked)} checked={filtersChecked.brands.includes(brand)}>
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control />
                                    <Checkbox.Label>{brand}</Checkbox.Label>
                                </Checkbox.Root>
                            ))}
                        </Box>
                    </Stack>
                    <Stack textAlign="initial">
                        <Text textStyle="lg" fontWeight="medium">Talle</Text>
                        <Box display="flex" flexDirection="column" justifyContent="center">
                            {availableFilters.sizes.map((size, index) => (
                                <Checkbox.Root key={index} onCheckedChange={(checked) => handleCheckSize(size, checked)} checked={filtersChecked.sizes.includes(size)}>
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control />
                                    <Checkbox.Label>{size}</Checkbox.Label>
                                </Checkbox.Root>
                            ))}
                        </Box>
                    </Stack>

                    <Stack textAlign="initial">
                        <Text textStyle="lg" fontWeight="medium">Color</Text>
                        <Box display="flex" flexDirection="column" justifyContent="center">
                            {availableFilters.colors.map((color, index) => (
                                <Checkbox.Root key={index} onCheckedChange={(checked) => handleCheckColor(color, checked)} checked={filtersChecked.colors.includes(color)}>
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control />
                                    <Checkbox.Label>{color}</Checkbox.Label>
                                </Checkbox.Root>
                            ))}
                        </Box>
                    </Stack>

                    <Stack display="flex" flexDirection="row" justifyContent="space-around" alignItems="center">
                        <Field.Root width="80px">
                            <Text>Price Min</Text>
                            <NumberInput.Root size="xs" value={priceMin} onValueChange={(e) => { handleSetPrice("priceMin", e.value) }}>
                                <InputGroup startElement="$">
                                    <NumberInput.Input />
                                </InputGroup>
                            </NumberInput.Root>
                        </Field.Root>

                        <Field.Root width="80px">
                            <Text>Price Max</Text>
                            <NumberInput.Root size="xs" value={priceMax} onValueChange={(e) => { handleSetPrice("priceMax", e.value) }}>
                                <InputGroup startElement="$">
                                    <NumberInput.Input />
                                </InputGroup>
                            </NumberInput.Root>
                        </Field.Root>
                        <Button disabled={priceMin == 0 && priceMax == 0} onClick={() => { handleChangePrice() }}> &gt; </Button>
                    </Stack>

                </GridItem>

                <GridItem rowSpan={9} colSpan={7} display="flex" flexDirection="column" marginLeft="260px" width="calc(100% - 250px)">
                    <Box display="flex" width="calc(100% - 250px)" justifyContent="space-between" gap="10" position="fixed" top="60px" zIndex="50" bg="black">
                        <SearchBar onChangeSearch={handleChange} />
                        <Select.Root collection={sorts} value={sortBy} defaultValue={"Ordenar por"} onValueChange={(e) => { handleChangeSort(e.value) }} size="sm" width="320px">
                            <Select.HiddenSelect />
                            <Select.Control>
                                <Select.Trigger>
                                    <Select.ValueText placeholder="Ordenar por" />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal color="red">
                                <Select.Positioner>
                                    <Select.Content zIndex="9999">
                                        {sorts.items.map((sort) => (
                                            <Select.Item item={sort} key={sort.value}>
                                                {sort.label}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>
                    </Box>
                    <Grid templateColumns="repeat(5, 1fr)" gap="4" marginTop="120px">
                        {Array.isArray(variants) && variants.map((variant) => (
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
                                        <Modal trigger={<Button type="button" width="50px" flex="1" onClick={() => handleVariantUpdate(variant, variant.product)}>Editar</Button>}>
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
                        ))}
                    </Grid>
                </GridItem>

            </Grid >
            <Modal trigger={<Button position="fixed" right="0" bottom="0" size="lg" margin="1rem" colorPalette="teal" onClick={handleCreate}>+</Button>}>
                {({ closeModal }) => (
                    <ProductModal productUpdate={productUpdate} onSubmit={() => {
                        onSubmit()
                        setFilters(null)
                        closeModal()
                    }} />
                )}
            </Modal>
            <ToastContainer />
        </>
    )
}

export default ProductsPage;
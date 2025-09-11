import { Button, Card, Image, Text, Grid, GridItem, Checkbox, Select, Portal, InputGroup, ButtonGroup, Stack, createListCollection, Pagination, HStack, Field, Badge, Box, NumberInput, IconButton } from "@chakra-ui/react"
import { useStockEntries } from "../hooks/useStockEntries";
import { useProducts } from "../context/ProductContext";
import ProductModal from "../components/ProductModal";
import { Toaster } from "../components/ui/toaster";
import { useVariants } from "../hooks/useVariants";
import { useCart } from "../context/CartContext";
import { toast } from "../utils/notifyToast.js";
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../components/Modal";

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
            motive: String(motive),
            total: Number(stockEntry) * Number(purchasePrice)
        }
        await createEntry(entryData)
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
    const { products, fetchUniqueProduct, variants, availableFilters, totalPages, setFilters } = useProducts()
    const { disableVariant } = useVariants()
    const [variantUpdate, setVariantUpdate] = useState()
    const [priceMin, setPriceMin] = useState(0)
    const [priceMax, setPriceMax] = useState(0)
    const [sortBy, setSortBy] = useState()
    const [filtersChecked, setFiltersChecked] = useState({
        colors: [],
        sizes: [],
        brands: [],
        categories: []
    })
    const [page, setPage] = useState(1)
    const { addToCart } = useCart()

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
        setFilters(null)
    }

    const handleCreate = () => {
        setProductUpdate(null)
    }

    const handleVariantUpdate = async (variant, product) => {
        setVariantUpdate(variant)
        const res = await fetchUniqueProduct(product.id)
        setProductUpdate(res)
    }

    const handleCart = (variant) => {
        const item = variant.product
        const fullItem = {
            ...item,
            variants: {
                ...variant,
                quantity: 1,
                unitPrice: item.salePrice
            }
        }
        addToCart(fullItem)
        toast("añadido al carrito")
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

    const handleCheckCategory = (category, checked) => {
        if (checked.checked) {
            setFilters((prev) => ({ ...prev, category: category }))
            setFiltersChecked((prev) => ({ ...prev, categories: category }))
        }
        else {
            setFilters((prev) => {
                const newFilter = { ...prev }
                delete newFilter.category
                return newFilter
            })
            setFiltersChecked((prev) => ({ ...prev, categories: [] }))
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
            setFilters((prev) => ({ ...prev, sortBy: valueSplit[0], sortOrder: valueSplit[1] }))
        }
    }

    const handleChangePage = (page) => {
        setPage(page)
        setFilters((prev) => ({ ...prev, page: page }))
    }

    const handleDisable = async (id, closeModal) => {
        await disableVariant(id)
        closeModal()
    }

    return (
        <>
            <Grid templateColumns="repeat(8, 1fr)" templateRows="repeat(10, 1fr)">
                <GridItem rowSpan={10} colSpan={1} padding="4" bg="black" display="flex" flexDirection="column" gap="4" position="fixed" top="50px" zIndex="50" bottom="0">
                    <Box overflowY="auto" height="100%">
                        <Stack textAlign="initial">
                            <Text textStyle="lg" fontWeight="medium">Categorias</Text>
                            <Box display="flex" flexDirection="column" justifyContent="center">
                                {availableFilters.categories?.map((category, index) => (
                                    <Checkbox.Root key={index} onCheckedChange={(checked) => handleCheckCategory(category, checked)} checked={filtersChecked.categories.includes(category)}>
                                        <Checkbox.HiddenInput />
                                        <Checkbox.Control />
                                        <Checkbox.Label>{category}</Checkbox.Label>
                                    </Checkbox.Root>
                                ))}
                            </Box>
                        </Stack>

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
                    </Box>
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
                                        <Modal size={"xl"} trigger={<Button type="button" width="50px" flex="1" onClick={() => handleVariantUpdate(variant, variant.product)}>Editar</Button>}>
                                            {({ closeModal }) => (
                                                <ProductModal productUpdate={productUpdate} onSubmit={onSubmit} closeModal={closeModal} />
                                            )}
                                        </Modal>

                                        <Modal trigger={<Button colorPalette="red" flex="1" >Deshabilitar</Button>}>
                                            {({ closeModal }) => (
                                                <>
                                                    <h2 >Está seguro que desea deshabilitar esta variante?</h2>
                                                    <Button onClick={() => { handleDisable(variant.id, closeModal) }}>Deshabilitar</Button>
                                                </>
                                            )}
                                        </Modal>
                                    </Box>

                                    <Box gap="2" display="flex" justifyContent="center">
                                        <NumberInput.Root value={variant.stock} unstyled spinOnPress={false} >
                                            <HStack>
                                                <Button colorPalette="green" onClick={() => { handleCart(variant) }}>Cart</Button>
                                                <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />
                                                <Modal size={"sm"} trigger={
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
                    <Box display="flex" justifyContent="center">
                        <Pagination.Root count={(totalPages * 2)} pageSize={2} page={page} onPageChange={(e) => handleChangePage(e.page)}>
                            <ButtonGroup gap="4" size="sm" variant="ghost">
                                <Pagination.PrevTrigger asChild>
                                    <IconButton>
                                    </IconButton>
                                </Pagination.PrevTrigger>
                                <Pagination.PageText />
                                <Pagination.NextTrigger asChild>
                                    <IconButton>
                                    </IconButton>
                                </Pagination.NextTrigger>
                            </ButtonGroup>
                        </Pagination.Root>
                    </Box>
                </GridItem >

            </Grid >
            <Modal size={"xl"} trigger={<Button position="fixed" right="0" bottom="0" size="lg" margin="1rem" colorPalette="teal" onClick={handleCreate}>+</Button>}>
                {({ closeModal }) => (
                    <ProductModal productUpdate={productUpdate} onSubmit={onSubmit} closeModal={closeModal} />
                )}
            </Modal>
            <Toaster />
        </>
    )
}

export default ProductsPage;
import { Button, Card, Image, Text, Grid, GridItem, Checkbox, Select, Float, Portal, InputGroup, Accordion, Span, ButtonGroup, Stack, createListCollection, Pagination, HStack, Field, Badge, Box, NumberInput, IconButton } from "@chakra-ui/react"
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
import { LuShirt, LuShoppingCart, LuSquarePen, LuPackagePlus } from "react-icons/lu";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import { RiProhibitedLine } from "react-icons/ri";
import { FaFilter, FaFilterCircleXmark } from "react-icons/fa6";
import StockModalUpdate from "../components/StockModalUpdate";

function ProductsPage() {
    const [productUpdate, setProductUpdate] = useState(null)
    const { products, fetchUniqueProduct, variants, availableFilters, totalPages, setFilters, filters } = useProducts()
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

    useEffect(() => {
        setFilters({})
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
        console.log(value)
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

    const handleClearFilters = () => {
        setFilters({})
        setFiltersChecked({
            colors: [],
            sizes: [],
            brands: [],
            categories: []
        })
    }

    return (
        <>
            <Grid templateColumns="repeat(8, 1fr)" templateRows="repeat(10, 1fr)">
                <GridItem rowSpan={10} colSpan={1} padding="4" bg="black" display="flex" flexDirection="column" gap="4" position="fixed" top="70px" zIndex="50" bottom="0" overflowY="auto" height="100%" borderRightColor={'gray.500'} borderRightWidth={'2px'}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" width="full">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <FaFilter />
                            <Text>Filtros</Text>
                        </Box>
                        <Button onClick={() => handleClearFilters()} size="xs">
                            <FaFilterCircleXmark />
                            Limpiar Filtros
                        </Button>
                    </Box>
                    <Stack textAlign="initial">
                        <Accordion.Root collapsible>
                            <Accordion.Item>
                                <Accordion.ItemTrigger>
                                    <Span flex="1">Categorias</Span>
                                    <Accordion.ItemIndicator />
                                </Accordion.ItemTrigger>
                                <Accordion.ItemContent>
                                    <Accordion.ItemBody>
                                        <Box display="flex" flexDirection="column" justifyContent="center" gap="2">
                                            {availableFilters.categories?.map((category, index) => (
                                                <Checkbox.Root key={index} onCheckedChange={(checked) => handleCheckCategory(category, checked)} checked={filtersChecked.categories.includes(category)}>
                                                    <Checkbox.HiddenInput />
                                                    <Checkbox.Control />
                                                    <Checkbox.Label>{category}</Checkbox.Label>
                                                </Checkbox.Root>
                                            ))}
                                        </Box>
                                    </Accordion.ItemBody>
                                </Accordion.ItemContent>
                            </Accordion.Item>
                        </Accordion.Root>
                    </Stack>

                    <Stack textAlign="initial">
                        <Accordion.Root collapsible>
                            <Accordion.Item>
                                <Accordion.ItemTrigger>
                                    <Span flex="1">Marca</Span>
                                    <Accordion.ItemIndicator />
                                </Accordion.ItemTrigger>
                                <Accordion.ItemContent>
                                    <Accordion.ItemBody>
                                        <Box display="flex" flexDirection="column" justifyContent="center" gap="2">
                                            {availableFilters.brands.map((brand, index) => (
                                                <Checkbox.Root key={index} onCheckedChange={(checked) => handleCheckBrand(brand, checked)} checked={filtersChecked.brands.includes(brand)}>
                                                    <Checkbox.HiddenInput />
                                                    <Checkbox.Control />
                                                    <Checkbox.Label>{brand}</Checkbox.Label>
                                                </Checkbox.Root>
                                            ))}
                                        </Box>
                                    </Accordion.ItemBody>
                                </Accordion.ItemContent>
                            </Accordion.Item>
                        </Accordion.Root>
                    </Stack>
                    <Stack textAlign="initial">
                        <Accordion.Root collapsible>
                            <Accordion.Item>
                                <Accordion.ItemTrigger>
                                    <Span flex="1">Talle</Span>
                                    <Accordion.ItemIndicator />
                                </Accordion.ItemTrigger>
                                <Accordion.ItemContent>
                                    <Accordion.ItemBody>
                                        <Box display="flex" flexDirection="column" justifyContent="center" gap="2">
                                            {availableFilters.sizes.map((size, index) => (
                                                <Checkbox.Root key={index} onCheckedChange={(checked) => handleCheckSize(size, checked)} checked={filtersChecked.sizes.includes(size)}>
                                                    <Checkbox.HiddenInput />
                                                    <Checkbox.Control />
                                                    <Checkbox.Label>{size}</Checkbox.Label>
                                                </Checkbox.Root>
                                            ))}
                                        </Box>
                                    </Accordion.ItemBody>
                                </Accordion.ItemContent>
                            </Accordion.Item>
                        </Accordion.Root>
                    </Stack>

                    <Stack textAlign="initial">
                        <Accordion.Root collapsible>
                            <Accordion.Item>
                                <Accordion.ItemTrigger>
                                    <Span flex="1">Color</Span>
                                    <Accordion.ItemIndicator />
                                </Accordion.ItemTrigger>
                                <Accordion.ItemContent>
                                    <Accordion.ItemBody>
                                        <Box display="flex" flexDirection="column" justifyContent="center" gap="2">
                                            {availableFilters.colors.map((color, index) => (
                                                <Checkbox.Root key={index} onCheckedChange={(checked) => handleCheckColor(color, checked)} checked={filtersChecked.colors.includes(color)}>
                                                    <Checkbox.HiddenInput />
                                                    <Checkbox.Control />
                                                    <Checkbox.Label>{color}</Checkbox.Label>
                                                </Checkbox.Root>
                                            ))}
                                        </Box>
                                    </Accordion.ItemBody>
                                </Accordion.ItemContent>
                            </Accordion.Item>
                        </Accordion.Root>
                    </Stack>

                    <Stack display="flex" flexDirection="row" justifyContent="space-around" alignItems="center">
                        <Box>
                            <Text>Minimo</Text>
                            <Field.Root width="80px">
                                <NumberInput.Root size="xs" value={priceMin} onValueChange={(e) => { handleSetPrice("priceMin", e.value) }}>
                                    <InputGroup startElement="$">
                                        <NumberInput.Input />
                                    </InputGroup>
                                </NumberInput.Root>
                            </Field.Root>
                        </Box>

                        <Box>
                            <Text>Maximo</Text>
                            <Field.Root width="80px">
                                <NumberInput.Root size="xs" value={priceMax} onValueChange={(e) => { handleSetPrice("priceMax", e.value) }}>
                                    <InputGroup startElement="$">
                                        <NumberInput.Input />
                                    </InputGroup>
                                </NumberInput.Root>
                            </Field.Root>
                        </Box>
                        <Box>
                            <Text>Filtrar</Text>
                            <IconButton disabled={priceMin == 0 && priceMax == 0} onClick={() => { handleChangePrice() }} size="xs">
                                <LuChevronRight />
                            </IconButton>
                        </Box>
                    </Stack>
                </GridItem>

                <GridItem rowSpan={9} colSpan={7} display="flex" flexDirection="column" marginLeft="270px" width="calc(100% - 250px)">
                    <Box display="flex" width="calc(100% - 250px)" justifyContent="space-between" gap="2" position="fixed" top="80px" zIndex="50" bg="black">
                        <SearchBar onChangeSearch={handleChange} />
                        <Select.Root collection={sorts} value={sortBy} defaultValue={"Ordenar por"} onValueChange={(e) => { handleChangeSort(e.value) }} size="sm" width="250px" paddingRight="35px">
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
                    <Grid templateColumns="repeat(5, 1fr)" gap="4" marginTop="130px">
                        {Array.isArray(variants) && variants.map((variant) => (
                            <Box display="inline-block" pos="relative" key={variant.id}>
                                <Card.Root width="170px" size="sm" overflow="hidden">
                                    <Image src={variant.image} maxHeight="170px" w="full" fit="cover" />
                                    <Card.Body>
                                        <Card.Title>{variant.product.name}</Card.Title>
                                        <HStack mt="1">
                                            <Badge>{variant.product.brand}</Badge>
                                            <Badge>Talle {variant.size}</Badge>
                                            <Badge>{variant.color}</Badge>
                                        </HStack>
                                        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">${new Intl.NumberFormat("es-AR").format(variant.product.salePrice)}</Text>
                                    </Card.Body>
                                    <Card.Footer display="flex" flexDirection="column" justifyContent="center">

                                        <Box display="flex" justifyContent="center" gap="4">
                                            <Modal size={"xl"} trigger={
                                                <Button type="button" width="50px" flex="1" onClick={() => handleVariantUpdate(variant, variant.product)}>
                                                    <LuSquarePen />
                                                </Button>}>
                                                {({ closeModal }) => (
                                                    <ProductModal productUpdate={productUpdate} onSubmit={onSubmit} closeModal={closeModal} />
                                                )}
                                            </Modal>

                                            <Modal trigger={
                                                <Button colorPalette="red" flex="1" >
                                                    <RiProhibitedLine />
                                                </Button>}>
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
                                                    <Button colorPalette="green" onClick={() => { handleCart(variant) }}>
                                                        <LuShoppingCart />
                                                    </Button>
                                                    <Modal size={"sm"} title="Ingresar stock" trigger={
                                                        <NumberInput.Control onClick={() => setVariantUpdate(variant)}>
                                                            <IconButton variant="outline" size="sm">
                                                                <LuPackagePlus />
                                                                Stock
                                                            </IconButton>
                                                        </NumberInput.Control>
                                                    }>
                                                        {({ closeModal }) => (
                                                            <StockModalUpdate variantUpdate={variantUpdate} closeModal={closeModal} />
                                                        )}
                                                    </Modal>
                                                </HStack>
                                            </NumberInput.Root>
                                        </Box>

                                    </Card.Footer>
                                </Card.Root>
                                <Float placement="top-end" zIndex="6">
                                    <Badge size="sm" variant="solid" colorPalette={variant.stock > 5 ? "teal" : "red"}>
                                        Stock: {variant.stock}
                                    </Badge>
                                </Float>
                            </Box>
                        ))}
                    </Grid>
                    <Box display="flex" justifyContent="center">
                        <Pagination.Root count={(totalPages * 2)} pageSize={2} page={page} onPageChange={(e) => handleChangePage(e.page)}>
                            <ButtonGroup gap="4" size="sm" variant="ghost">
                                <Pagination.PrevTrigger asChild>
                                    <IconButton>
                                        <LuChevronLeft />
                                    </IconButton>
                                </Pagination.PrevTrigger>
                                <Pagination.PageText />
                                <Pagination.NextTrigger asChild>
                                    <IconButton>
                                        <LuChevronRight />
                                    </IconButton>
                                </Pagination.NextTrigger>
                            </ButtonGroup>
                        </Pagination.Root>
                    </Box>
                </GridItem >

            </Grid >
            <Modal size="xl" trigger={
                <Button position="fixed" right="0" bottom="0" size="lg" margin="1rem" colorPalette="teal" onClick={handleCreate} display="flex" justifyContent="center" gap="0">
                    <LuShirt />
                    <Text margin="0px" paddingLeft="0px">+</Text>
                </Button>
            }>
                {({ closeModal }) => (
                    <ProductModal productUpdate={productUpdate} onSubmit={onSubmit} closeModal={closeModal} />
                )}
            </Modal>
            <Toaster />
        </>
    )
}

export default ProductsPage;
import { useEffect, useState } from "react";
import { useSales } from "../hooks/useSales.js";
import { Button, Table, Box, DataList, Image, Grid } from "@chakra-ui/react";
import Modal from "../components/Modal.jsx";
import { useProducts } from "../context/ProductContext.jsx";
import { useVariants } from "../hooks/useVariants.js";

function SalesPage() {
    const { getAllSales, sales } = useSales()
    const [saleSelected, setSaleSelected] = useState([])
    const { products } = useProducts()
    const { variants, fetchVariants } = useVariants()
    const [variantsImage, setVariantsImage] = useState()

    useEffect(() => {
        getAllSales()
        fetchVariants()
    }, [])

    const handleSaleSelected = (sale) => {
        const variantsSales = sale.items.map((item) => (item.variantId))
        const variantsInfo = variantsSales.map(id => variants.find(v => v.id === id))
        const productInfo = variantsInfo.map(variant => products.find(p => p.id === variant.productId))
        console.log(productInfo)
        /* setProductsComplete({...productInfo, variants: {...variantsInfo}}) */
        setVariantsImage(variantsInfo.map((item) => (item.image)))
        setSaleSelected(sale)

    }

    return (
        <>
            <Table.Root size="sm" striped>
                <Table.Caption>Product inventory and pricing information</Table.Caption>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Vendedor</Table.ColumnHeader>
                        <Table.ColumnHeader>Fecha</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="end">Precio</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {sales && sales.map((sale) => (
                        <Table.Row key={sale.id}>
                            <Table.Cell>{sale.userId}</Table.Cell>
                            <Table.Cell>{sale.date}
                                <Modal trigger={<Button size="sm" variant="surface" onClick={() => { handleSaleSelected(sale) }}>+Info</Button>}>
                                    <Box>
                                        <DataList.Root orientation="horizontal" divideY="1px" maxW="md">
                                            <DataList.Item pt="4">
                                                <DataList.ItemLabel>Fecha</DataList.ItemLabel>
                                                <DataList.ItemValue>{saleSelected.date}</DataList.ItemValue>
                                            </DataList.Item>
                                            <DataList.Item pt="4">
                                                <DataList.ItemLabel>Precio Final</DataList.ItemLabel>
                                                <DataList.ItemValue>$ {new Intl.NumberFormat("es-AR").format(sale.totalPrice)}</DataList.ItemValue>
                                            </DataList.Item>
                                            <DataList.Item pt="4">
                                                <DataList.ItemLabel>Vendedor ID</DataList.ItemLabel>
                                                <DataList.ItemValue>{saleSelected.userId}</DataList.ItemValue>
                                            </DataList.Item>
                                            <DataList.Item pt="4">
                                                <DataList.ItemLabel>Productos</DataList.ItemLabel>
                                                <Grid templateColumns="repeat(3, 1fr)" gap="4">
                                                    {variantsImage && variantsImage.map(variantImage => (
                                                        <DataList.ItemValue key={variantImage}><Image src={variantImage} /></DataList.ItemValue>
                                                    ))}
                                                </Grid>
                                            </DataList.Item>
                                        </DataList.Root>
                                    </Box>
                                </Modal>
                            </Table.Cell>
                            <Table.Cell textAlign="end">$ {new Intl.NumberFormat("es-AR").format(sale.totalPrice)}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </>
    )
}

export default SalesPage;
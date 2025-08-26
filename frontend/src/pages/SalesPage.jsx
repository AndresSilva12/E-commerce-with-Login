import { Fragment, useEffect, useState } from "react";
import { useSales } from "../hooks/useSales.js";
import { Button, Table, Box, DataList, Image, Grid } from "@chakra-ui/react";
import Modal from "../components/Modal.jsx";

export function SaleSelectedModal({ saleSelected }) {
    return (
        <Box>
            <DataList.Root orientation="horizontal" divideY="1px" maxW="md">
                <DataList.Item pt="4">
                    <DataList.ItemLabel>Vendedor ID</DataList.ItemLabel>
                    <DataList.ItemValue>{saleSelected.userId}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item pt="4">
                    <DataList.ItemLabel>Fecha</DataList.ItemLabel>
                    <DataList.ItemValue>{saleSelected.date}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item pt="4">
                    <DataList.ItemLabel>Motivo</DataList.ItemLabel>
                    <DataList.ItemValue>{saleSelected.motive}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item pt="4">
                    <DataList.ItemLabel>Productos</DataList.ItemLabel>
                    <Grid templateColumns="repeat(3, 1fr)" gap="4">
                        {saleSelected.items.map(item => (
                            <Image key={item.variant.id} src={item.variant.image} h="full" w="40px" fit="contain" />
                        ))}
                    </Grid>
                </DataList.Item>
                <DataList.Item pt="4">
                    <DataList.ItemLabel>Precio Final</DataList.ItemLabel>
                    <DataList.ItemValue>$ {new Intl.NumberFormat("es-AR").format(saleSelected.totalPrice)}</DataList.ItemValue>
                </DataList.Item>
            </DataList.Root>
        </Box>
    )
}

function SalesPage() {
    const { getAllSales, sales } = useSales()
    const [saleSelected, setSaleSelected] = useState([])

    useEffect(() => {
        getAllSales()
    }, [])

    const handleSaleSelected = (sale) => {
        setSaleSelected(sale)
    }

    return (
        <Box paddingTop="60px">
            <Table.Root size="sm" striped>
                <Table.Caption>Product inventory and pricing information</Table.Caption>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Vendedor</Table.ColumnHeader>
                        <Table.ColumnHeader>Fecha</Table.ColumnHeader>
                        <Table.ColumnHeader>Productos</Table.ColumnHeader>
                        <Table.ColumnHeader>Precio Unitario</Table.ColumnHeader>
                        <Table.ColumnHeader>Precio Final</Table.ColumnHeader>
                        <Table.ColumnHeader>Motivo</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {sales && sales.map((sale) => (
                        <Table.Row key={sale.id}>
                            <Table.Cell>{sale.user.name} {sale.user.lastName}</Table.Cell>
                            <Table.Cell>{sale.date}
                                <Modal trigger={<Button size="sm" variant="surface" onClick={() => { handleSaleSelected(sale) }}>+Info</Button>}>
                                    <SaleSelectedModal saleSelected={saleSelected} />
                                </Modal>
                            </Table.Cell>
                            <Table.Cell>
                                {sale.items.map(item => (
                                    <Fragment key={item.id}>
                                        <Box display="flex" flexDirection="column" key={item.variant.id}>
                                            {item.quantity} {item.variant.product.name} {item.variant.product.brand}
                                        </Box>
                                    </Fragment>
                                ))}
                            </Table.Cell>
                            <Table.Cell>
                                {sale.items.map(item => (
                                    <Fragment key={item.id}>
                                        <Box display="flex" flexDirection="column" key={item.variant.id}>
                                            $ {new Intl.NumberFormat("es-AR").format(item.unitPrice)}
                                        </Box>
                                    </Fragment>
                                ))}
                            </Table.Cell>
                            <Table.Cell>$ {new Intl.NumberFormat("es-AR").format(sale.totalPrice)}</Table.Cell>
                            <Table.Cell>{sale.motive}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Box>
    )
}

export default SalesPage;
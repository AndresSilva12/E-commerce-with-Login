import { Fragment, useEffect, useState } from "react";
import { useSales } from "../hooks/useSales.js";
import { Button, Table, Box, DataList, Image, Grid, GridItem } from "@chakra-ui/react";
import Calendar from "react-calendar";
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
    const { getAllSales, sales, deleteSale } = useSales()
    const [saleSelected, setSaleSelected] = useState([])
    const [filters, setFilters] = useState()

    useEffect(() => {
        const query = new URLSearchParams(filters).toString()
        getAllSales(query)
    }, [filters])

    const handleSaleSelected = (sale) => {
        setSaleSelected(sale)
    }

    const handleChangeDate = (value, selected) => {
        const year = value.getFullYear()
        const month = value.getMonth() + 1
        const minDay = value.getDate()
        selected === "month"
            ? setFilters({ year: year, month: month })
            : selected === "day"
                ? setFilters({ year: year, month: month, minDay: minDay })
                : setFilters({ year: year })
    }

    return (
        <Grid templateColumns="repeat(8, 1fr)" templateRows="repeat(10, 1fr)">
            <GridItem rowSpan={10} colSpan={1} padding="4" bg="black" display="flex" flexDirection="column" justifyContent="center" gap="4" position="fixed" top="50px" zIndex="50" bottom="0">
                <Box width="240px">
                    <Calendar
                        onClickMonth={(value, e) => { handleChangeDate(value, "month") }}
                        onClickYear={(value, e) => { handleChangeDate(value, "year") }}
                        onClickDay={(value, e) => { handleChangeDate(value, "day") }}
                    />
                </Box>
            </GridItem>
            <GridItem rowSpan={9} colSpan={7} display="flex" flexDirection="column" marginLeft="260px" marginTop="60px" width="92%">
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
                            <Table.ColumnHeader>Eliminar</Table.ColumnHeader>
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
                                <Table.Cell>
                                    <Modal size={"sm"} trigger={<Button backgroundColor={"red.700"}>Delete</Button>}>
                                        <h2 >Está seguro que desea eliminar esta venta?</h2>
                                        <Button onClick={() => { deleteSale(sale.id) }}>Eliminar</Button>
                                    </Modal>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </GridItem>
        </Grid>
    )
}

export default SalesPage;
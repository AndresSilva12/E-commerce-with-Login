import { Fragment, useEffect, useState } from "react";
import { useSales } from "../hooks/useSales.js";
import { Button, Table, Box, Grid, GridItem, ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { Toaster } from "../components/ui/toaster";
import Modal from "../components/Modal.jsx";
import SaleModal from "../components/SaleModal.jsx";
import DateFilters from "../components/DateFilters";
import { BsInfoCircle } from "react-icons/bs";
import { LuTrash2, LuChevronLeft, LuChevronRight } from "react-icons/lu";

function SalesPage() {
    const { getAllSales, sales, deleteSale, totalPages } = useSales()
    const [saleSelected, setSaleSelected] = useState([])
    const [filters, setFilters] = useState()
    const [page, setPage] = useState(1)

    useEffect(() => {
        const query = new URLSearchParams(filters).toString()
        getAllSales(query)
    }, [filters, page])

    const handleSaleSelected = (sale) => {
        setSaleSelected(sale)
    }

    const handleChangePage = (page) => {
        setPage(page)
        setFilters((prev) => ({ ...prev, page: page }))
    }

    return (
        <Grid templateColumns="repeat(8, 1fr)" templateRows="repeat(10, 1fr)">
            <GridItem rowSpan={10} colSpan={1} padding="4" bg="black" width="290px" display="flex" flexDirection="column" gap="4" position="fixed" top="70px" zIndex="50" bottom="0" borderRightColor={'gray.500'} borderRightWidth="2px">
                <DateFilters setFilters={setFilters} />
            </GridItem>
            <GridItem rowSpan={9} colSpan={7} display="flex" flexDirection="column" marginLeft="260px" marginTop="80px" width="92%">
                <Table.Root marginLeft="60px" size="sm" striped width="90%">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Vendedor</Table.ColumnHeader>
                            <Table.ColumnHeader>Fecha</Table.ColumnHeader>
                            <Table.ColumnHeader>+ Info</Table.ColumnHeader>
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
                                <Table.Cell>{sale.user.username}</Table.Cell>
                                <Table.Cell>{sale.date.slice(0, 10)}</Table.Cell>
                                <Table.Cell>
                                    <Modal size="lg" title="Detalle de venta" trigger={
                                        <Button size="sm" variant="surface" onClick={() => { handleSaleSelected(sale) }}>
                                            <BsInfoCircle />
                                        </Button>
                                    }>
                                        <SaleModal saleSelected={saleSelected} />
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
                                    <Modal size={"sm"} title={"Eliminar venta"} trigger={
                                        <Button colorPalette="red">
                                            <LuTrash2 />
                                        </Button>
                                    } footer={<Button onClick={() => { deleteSale(sale.id) }}>Eliminar</Button>}>
                                        <p>Está seguro que desea eliminar esta venta?</p>
                                        <p>Se restablecerá el stock y no podrá recuperar esta venta</p>

                                    </Modal>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
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
            </GridItem>
            <Toaster />
        </Grid>
    )
}

export default SalesPage;
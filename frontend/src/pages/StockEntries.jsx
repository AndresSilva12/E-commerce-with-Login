import { useEffect, useState } from "react";
import { Fragment } from "react"
import { useStockEntries } from "../hooks/useStockEntries.js";
import { Button, Table, Box, DataList, Image, Grid, GridItem, Stack, Text, Strong, Pagination, ButtonGroup, IconButton } from "@chakra-ui/react";
import Modal from "../components/Modal.jsx";
import Calendar from "react-calendar"
import { Toaster } from "../components/ui/toaster";
import { LuTrash2, LuChevronLeft, LuChevronRight } from "react-icons/lu";

export function EntrySelectedModal({ entrySelected }) {
    return (
        <Box>
            <DataList.Root orientation="horizontal" divideY="1px" maxW="md">
                <DataList.Item pt="4">
                    <DataList.ItemLabel>Fecha</DataList.ItemLabel>
                    <DataList.ItemValue>{entrySelected.date}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item pt="4">
                    <DataList.ItemLabel>Vendedor ID</DataList.ItemLabel>
                    <DataList.ItemValue>{entrySelected.user.name} {entrySelected.user.lastName}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item pt="4">
                    <DataList.ItemLabel>Motivo</DataList.ItemLabel>
                    <DataList.ItemValue>{entrySelected.motive}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item pt="4">
                    <DataList.ItemLabel>Producto</DataList.ItemLabel>
                    <Grid templateColumns="repeat(3, 1fr)" gap="4">
                        {entrySelected.items.map(item => (
                            <Box key={item.id} display="flex" flexDirection="column" textAlign="center" width="100px">
                                <Image src={item.variant.image} h="100px" w="400px" fit="contain" />
                                <Stack display="flex" flexDirection="column" textAlign="initial" justifyContent="flex-end" width="100%" height="100%">
                                    <Strong fontWeight="semibold" textStyle="sm">{item.variant.product.name} {item.variant.product.brand}</Strong>
                                    <Text color="fg.muted" textStyle="sm">Codigo: {item.variant.code}</Text>
                                    <Text color="fg.muted" textStyle="sm">Cantidad: {item.quantity}</Text>
                                    <Text color="fg.muted" textStyle="sm">Precio Unitario: $ {new Intl.NumberFormat("es-AR").format(item.purchasePrice)}</Text>
                                </Stack>
                            </Box>
                        ))}
                    </Grid>
                </DataList.Item>
                <DataList.Item pt="4">
                    <DataList.ItemLabel>Precio Final</DataList.ItemLabel>
                    <DataList.ItemValue>$ {new Intl.NumberFormat("es-AR").format(entrySelected.total)}</DataList.ItemValue>
                </DataList.Item>
            </DataList.Root>
        </Box>
    )
}

function StockEntriesPage() {
    const { getAllStockEntries, stockEntries, deleteEntry, totalPages } = useStockEntries()
    const [entrySelected, setEntrySelected] = useState([])
    const [filters, setFilters] = useState()
    const [page, setPage] = useState(1)

    useEffect(() => {
        const query = new URLSearchParams(filters).toString()
        getAllStockEntries(query)
    }, [filters, page])


    const handleEntrySelected = (entry) => {
        setEntrySelected(entry)
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

    const handleChangePage = (page) => {
        setPage(page)
        setFilters((prev) => ({ ...prev, page: page }))
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
                <Table.Root marginLeft="10px" size="sm" striped width="99%">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Vendedor</Table.ColumnHeader>
                            <Table.ColumnHeader>Fecha</Table.ColumnHeader>
                            <Table.ColumnHeader>+ Info</Table.ColumnHeader>
                            <Table.ColumnHeader>Producto</Table.ColumnHeader>
                            <Table.ColumnHeader>Cantidad</Table.ColumnHeader>
                            <Table.ColumnHeader>Precio unidad</Table.ColumnHeader>
                            <Table.ColumnHeader>Compra total</Table.ColumnHeader>
                            <Table.ColumnHeader>Motivo</Table.ColumnHeader>
                            <Table.ColumnHeader>Eliminar</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {stockEntries && stockEntries.map((entry) => (
                            <Table.Row key={entry.id}>
                                <Table.Cell>{entry.user.username}</Table.Cell>
                                <Table.Cell>{entry.date.slice(0, 10)}</Table.Cell>
                                <Table.Cell>
                                    <Modal trigger={<Button size="sm" variant="surface" onClick={() => { handleEntrySelected(entry) }}>+Info</Button>}>
                                        <EntrySelectedModal entrySelected={entrySelected} />
                                    </Modal>
                                </Table.Cell>
                                {entry.items.map((item) => (
                                    <Fragment key={item.id}>
                                        <Table.Cell key={item.id}>
                                            <Box display="flex" alignItems="center">
                                                {item.variant.product.name} {item.variant.product.brand}
                                            </Box>
                                        </Table.Cell>
                                        <Table.Cell textStyle="lg" color="green">+ {item.quantity}</Table.Cell>
                                        <Table.Cell>$ {new Intl.NumberFormat("es-AR").format(item.purchasePrice)}</Table.Cell>
                                    </Fragment>
                                ))}
                                <Table.Cell>$ {new Intl.NumberFormat("es-AR").format(entry.total)}</Table.Cell>
                                <Table.Cell>{entry.motive}</Table.Cell>
                                <Table.Cell>
                                    <Modal size={"sm"} trigger={
                                        <Button colorPalette="red">
                                            <LuTrash2 />
                                        </Button>
                                    }>
                                        <h2 >Está seguro que desea eliminar esta entrada?</h2>
                                        <Button onClick={() => { deleteEntry(entry.id) }}>Eliminar</Button>
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
        </Grid >
    )
}

export default StockEntriesPage;
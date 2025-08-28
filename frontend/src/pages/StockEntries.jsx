import { useEffect, useState } from "react";
import { Fragment } from "react"
import { useStockEntries } from "../hooks/useStockEntries.js";
import { Button, Table, Box, DataList, Image, Grid, Stack } from "@chakra-ui/react";
import Modal from "../components/Modal.jsx";

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
                    <DataList.ItemValue>{entrySelected.userId}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item pt="4">
                    <DataList.ItemLabel>Motivo</DataList.ItemLabel>
                    <DataList.ItemValue>{entrySelected.motive}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item pt="4">
                    <DataList.ItemLabel>Producto</DataList.ItemLabel>
                    <Grid templateColumns="repeat(3, 1fr)" gap="4">
                        {entrySelected.items.map(item => (
                            <Box key={item.id}>
                                <Image src={item.variant.image} />
                                <Stack>
                                    {item.variant.product.name} {item.variant.product.brand}
                                </Stack>
                                {item.variant.code}
                            </Box>
                        ))}
                    </Grid>
                </DataList.Item>
                <DataList.Item pt="4">
                    <DataList.ItemLabel>Cantidad</DataList.ItemLabel>
                    {entrySelected.items.map(item => (
                        <DataList.ItemValue key={item.id}>{item.quantity} ${item.purchasePrice}</DataList.ItemValue>
                    ))
                    }
                </DataList.Item>
            </DataList.Root>
        </Box>
    )
}

function StockEntriesPage() {
    const { getAllStockEntries, stockEntries } = useStockEntries()
    const [entrySelected, setEntrySelected] = useState([])
    useEffect(() => {
        getAllStockEntries()
    }, [])


    const handleEntrySelected = (entry) => {
        setEntrySelected(entry)
    }

    return (
        <Box paddingTop="60px">
            <Table.Root size="sm" striped>
                <Table.Caption>Product inventory and pricing information</Table.Caption>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Vendedor</Table.ColumnHeader>
                        <Table.ColumnHeader>Fecha</Table.ColumnHeader>
                        <Table.ColumnHeader>Producto</Table.ColumnHeader>
                        <Table.ColumnHeader>Cantidad</Table.ColumnHeader>
                        <Table.ColumnHeader>Precio unidad</Table.ColumnHeader>
                        <Table.ColumnHeader>Compra total</Table.ColumnHeader>
                        <Table.ColumnHeader>Motivo</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {stockEntries && stockEntries.map((entry) => (
                        <Table.Row key={entry.id}>
                            <Table.Cell>{entry.user.name} {entry.user.lastName}</Table.Cell>
                            <Table.Cell>{entry.date}
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
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Box>
    )
}

export default StockEntriesPage;
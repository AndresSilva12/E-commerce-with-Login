import { Table, Box, DataList, Grid, HStack, Avatar } from "@chakra-ui/react";

function EntryModal({ entrySelected }) {
    return (
        <Box>
            <DataList.Root orientation="horizontal" divideY="1px" maxW="md">
                <DataList.Item pt="4">
                    <DataList.ItemLabel>Fecha</DataList.ItemLabel>
                    <DataList.ItemValue>{entrySelected.date}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item pt="4">
                    <DataList.ItemLabel>Vendedor </DataList.ItemLabel>
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
                                <HStack>
                                    <Table.Root size="sm">
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.ColumnHeader>
                                                    <Avatar.Root size="sm">
                                                        <Avatar.Image src={item.variant.image} />
                                                        <Avatar.Fallback name={item.variant.product.name} />
                                                    </Avatar.Root>
                                                </Table.ColumnHeader>
                                                <Table.ColumnHeader>Marca</Table.ColumnHeader>
                                                <Table.ColumnHeader>Codigo</Table.ColumnHeader>
                                                <Table.ColumnHeader>Cantidad</Table.ColumnHeader>
                                                <Table.ColumnHeader textAlign="end">Precio Unitario</Table.ColumnHeader>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>{item.variant.product.name}</Table.Cell>
                                                <Table.Cell>{item.variant.product.brand}</Table.Cell>
                                                <Table.Cell>{item.variant.code}</Table.Cell>
                                                <Table.Cell>{item.quantity}</Table.Cell>
                                                <Table.Cell textAlign="end">$ {new Intl.NumberFormat("es-AR").format(item.purchasePrice)}</Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table.Root>
                                </HStack>
                            </Box>
                        ))
                        }
                    </Grid >
                </DataList.Item >
                <DataList.Item pt="4">
                    <DataList.ItemLabel>Precio Final</DataList.ItemLabel>
                    <DataList.ItemValue>$ {new Intl.NumberFormat("es-AR").format(entrySelected.total)}</DataList.ItemValue>
                </DataList.Item>
            </DataList.Root >
        </Box >
    )
}

export default EntryModal;
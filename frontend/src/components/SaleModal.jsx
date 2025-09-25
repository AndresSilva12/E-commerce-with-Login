import { Table, Box, DataList, Grid, HStack, Avatar } from "@chakra-ui/react";


function SaleModal({ saleSelected }) {
    return (
        <Box>
            <DataList.Root orientation="horizontal" divideY="1px" maxW="xl">
                <DataList.Item pt="4">
                    <DataList.ItemLabel>Vendedor</DataList.ItemLabel>
                    <DataList.ItemValue>{saleSelected.user.name} {saleSelected.user.lastName}</DataList.ItemValue>
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
                    <DataList.ItemLabel>Producto/s</DataList.ItemLabel>
                    <Grid templateColumns="repeat(3, 1fr)" gap="4">
                        <Box display="flex" flexDirection="column" textAlign="center" width="100px" >
                            <HStack>
                                <Table.Root size="md">
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.ColumnHeader>Imagen</Table.ColumnHeader>
                                            <Table.ColumnHeader>Nombre</Table.ColumnHeader>
                                            <Table.ColumnHeader>Marca</Table.ColumnHeader>
                                            <Table.ColumnHeader>Codigo</Table.ColumnHeader>
                                            <Table.ColumnHeader>Cantidad</Table.ColumnHeader>
                                            <Table.ColumnHeader textAlign="end">Precio Unitario</Table.ColumnHeader>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {saleSelected.items.map(item => (
                                            <Table.Row key={item.id}>
                                                <Table.Cell>
                                                    <Avatar.Root size="sm">
                                                        <Avatar.Image src={item.variant.image} />
                                                        <Avatar.Fallback name={item.variant.product.name} />
                                                    </Avatar.Root>
                                                </Table.Cell>
                                                <Table.Cell>{item.variant.product.name}</Table.Cell>
                                                <Table.Cell>{item.variant.product.brand}</Table.Cell>
                                                <Table.Cell>{item.variant.code}</Table.Cell>
                                                <Table.Cell>{item.quantity}</Table.Cell>
                                                <Table.Cell textAlign="start">${new Intl.NumberFormat("es-AR").format(item.unitPrice)}</Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table.Root>
                            </HStack>
                        </Box>
                    </Grid>
                </DataList.Item>
                <DataList.Item pt="4">
                    <DataList.ItemLabel>Precio Final</DataList.ItemLabel>
                    <DataList.ItemValue justifyContent="end" >$ {new Intl.NumberFormat("es-AR").format(saleSelected.totalPrice)}</DataList.ItemValue>
                </DataList.Item>
            </DataList.Root>
        </Box >
    )
}

export default SaleModal;
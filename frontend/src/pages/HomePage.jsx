import { useSales } from "../hooks/useSales";
import { AuthContext } from "../context/AuthContext";
import { Button, Text, Box, Card, Stack, Stat, Grid, FormatNumber, Badge, DataList } from "@chakra-ui/react"
import { useContext, useEffect, Fragment } from "react";
import { LuStore } from "react-icons/lu";

function HomePage() {
    const { user } = useContext(AuthContext)
    const { getAllSales, sales } = useSales()

    useEffect(() => {
        getAllSales()
    }, [])

    if (!user) {
        return (
            <Box paddingTop="70px" width="full" height="90vh" alignItems="center" justifyContent="center" display="flex" margin="auto" gap="20">
                <Box>
                    {/* <LuStore size="1/3" /> */}
                </Box>
                <Box display="flex" flexDirection="column" gap="5">
                    <Text fontWeight="bold" fontSize="2xl">Sistema de Inventario y Gestión de Ventas</Text>
                    <Text color="GrayText">Para iniciar sesion debe de registrarse</Text>
                    <Box display="flex" justifyContent="initial" gap="4">
                        <Button as={'a'} href={'/register'}>Registrarse</Button>
                        <Button backgroundColor="teal" color="white" as={'a'} href={'/login'}>Iniciar Sesion</Button>
                    </Box>
                </Box>
            </Box>
        )
    }

    return (
        <Box paddingTop="80px">
            Hola, {user.username}. Este es un resumen de las últimas ventas
            <Grid templateColumns="repeat(4, 1fr)" gap="6">
                {sales && sales.map(sale => (
                    <Card.Root maxW="xs" size="sm" width="full">
                        <Card.Body>
                            <Stat.Root>
                                <DataList.Root orientation="horizontal" width="full">
                                    <DataList.Item>
                                        <DataList.ItemLabel>Fecha</DataList.ItemLabel>
                                        <DataList.ItemValue>{sale.date.slice(0, 10)}</DataList.ItemValue>
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.ItemLabel>Total</DataList.ItemLabel>
                                        <DataList.ItemValue>$ {new Intl.NumberFormat("es-AR").format(sale.totalPrice)}</DataList.ItemValue>
                                    </DataList.Item>
                                    <Text>Productos</Text>
                                    {sale.items.map(item => {
                                        const saleTotal = item.unitPrice * item.quantity
                                        const purchaseTotal = item.purchasePrice * item.quantity
                                        const profitPercent = ((saleTotal - purchaseTotal) / saleTotal) * 100
                                        return (
                                            <DataList.Item>
                                                <DataList.ItemLabel>
                                                    <Box textStyle="xs" color="fg.muted">{item.variant.product.name}</Box>
                                                </DataList.ItemLabel>
                                                <DataList.ItemValue>
                                                    <Fragment key={item.id}>
                                                        < Badge colorPalette={"green"} gap="1" >
                                                            <Text>Ganancia</Text>
                                                            <Stat.UpIndicator />
                                                            <FormatNumber value={profitPercent / 100} style="percent" maximumFractionDigits={2} />
                                                        </Badge>
                                                    </Fragment>
                                                </DataList.ItemValue>
                                            </DataList.Item>
                                        )
                                    }
                                    )}
                                    <DataList.Item>
                                        <DataList.ItemLabel>Vendedor</DataList.ItemLabel>
                                        <DataList.ItemValue>{sale.user.username}</DataList.ItemValue>
                                    </DataList.Item>
                                </DataList.Root>
                            </Stat.Root>
                        </Card.Body>
                    </Card.Root>
                ))
                }
            </Grid>
        </Box >
    )
}

export default HomePage;
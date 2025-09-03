import Modal from "../components/Modal"
import { BarList, Chart, useChart } from "@chakra-ui/charts"
import { Badge, Box, Card, Table, FormatNumber, Span, Stack, Stat, Grid, GridItem, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Cell, Label, Pie, PieChart, Tooltip } from "recharts"
import Calendar from "react-calendar"

export function ProductsChart({ ventasProductos, ventasCategorias, total }) {
    const chartData = ventasProductos ?
        ventasProductos.map((item) => ({
            name: `${item.productName} ${item.color} ${item.size}`,
            value: total
                ? item.totalVendido
                : item.cantidadVendido
        }))
        :
        ventasCategorias.map((item) => ({
            name: item.name,
            value: item.quantity
        }))

    const chart = useChart({
        sort: { by: "value", direction: "desc" },
        data: chartData,
        series: [{ name: "name", color: "teal.subtle" }]
    })

    return (
        <BarList.Root chart={chart}>
            <BarList.Content>
                <BarList.Label title={ventasProductos ? 'Productos mas vendidos' : 'Categorias mas vendidas'} flex="1">
                    <BarList.Bar />
                </BarList.Label>
                <BarList.Value />
            </BarList.Content>
        </BarList.Root>
    )
}

function Dashboard() {
    const [ingresosBrutos, setIngresosBrutos] = useState()
    const [ventasTotales, setVentasTotales] = useState()
    const [gananciaNeta, setGananciaNeta] = useState()
    const [totalGastos, setTotalGastos] = useState()
    const [expenses, setExpenses] = useState([])
    const [costos, setCostos] = useState()
    const [ventasProductos, setVentasProductos] = useState([])
    const [ventasCategorias, setVentasCategorias] = useState([])
    const [filters, setFilters] = useState()
    const { register, handleSubmit } = useForm()

    useEffect(() => {
        const fetchMetrics = async () => {
            const query = new URLSearchParams(filters).toString()
            const res = await fetch(`http://localhost:3000/api/dashboard/metrics?${query}`)
            const data = await res.json()
            setIngresosBrutos(data.ingresos)
            setGananciaNeta(data.gananciaNeta)
            setVentasTotales(data.ventasTotales)
            setVentasProductos(data.ventasProductos)
            setTotalGastos(data.totalExpenses)
            setExpenses(data.expenses)
            setCostos(data.costos)
            setVentasCategorias(data.ventasCategorias)
        }
        fetchMetrics()
    }, [filters])

    const chartPorcentajes = useChart({
        data: [
            { name: "Costo Recuperado", value: costos, color: "orange.solid" },
            { name: "Ganancia neta", value: gananciaNeta ?? 0, color: "green.solid" },
            /* { name: "Caja", value: gananciaNeta ?? 0, color: "blue.solid" }, */
        ],
    })

    const chartUtilidad = useChart({
        data: [
            { name: "gastos", value: totalGastos, color: "blue.solid" },
            { name: "utilidad", value: gananciaNeta + costos - totalGastos, color: "pink.solid" },
        ],
    })

    const chartGastos = useChart({
        data: expenses.map((expense) => ({
            name: expense.name,
            value: Number(expense.amount),
        })),
    })

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

    const createExpense = async (formData) => {
        console.log(formData)
        const res = await fetch('http://localhost:3000/api/expenses', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json()
        console.log(data)
    }

    const onValid = (value) => {
        createExpense(value)
        setFilters(null)
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
                <Box display="flex" width="full" justifyContent="center" gap="10">
                    <Card.Root maxW="xs" size="sm">
                        <Card.Body flexDirection="row" alignItems="center">
                            <Stack gap="0" flex="1">
                                <Box fontWeight="semibold" textStyle="sm">Ingresos Brutos</Box>
                                <Box textStyle="xs" color="fg.muted">Ventas</Box>
                            </Stack>
                            <Stat.Root size="sm" alignItems="flex-end">
                                <Span fontWeight="medium">
                                    <FormatNumber value={ingresosBrutos} style="currency" currency="USD" />
                                </Span>
                                <Badge colorPalette={"green"} gap="0">
                                    <Stat.UpIndicator />
                                    <FormatNumber value={1000} style="percent" maximumFractionDigits={2} />
                                </Badge>
                            </Stat.Root>
                        </Card.Body>
                    </Card.Root>
                    <Card.Root maxW="xs" size="sm">
                        <Card.Body flexDirection="row" alignItems="center">
                            <Stack gap="0" flex="1">
                                <Box fontWeight="semibold" textStyle="sm">Ganancia Neta</Box>
                                <Box textStyle="xs" color="fg.muted">Ventas - Costo</Box>
                            </Stack>
                            <Stat.Root size="sm" alignItems="flex-end">
                                <Span fontWeight="medium">
                                    <FormatNumber value={gananciaNeta} style="currency" currency="USD" />
                                </Span>
                                <Badge colorPalette={gananciaNeta > 0 ? "green" : "red"} gap="0">
                                    {gananciaNeta > 0
                                        ? <Stat.UpIndicator />
                                        : <Stat.DownIndicator />
                                    }
                                    <FormatNumber value={1000} style="percent" maximumFractionDigits={2} />
                                </Badge>
                            </Stat.Root>
                        </Card.Body>
                    </Card.Root>
                    <Card.Root maxW="xs" size="sm">
                        <Card.Body flexDirection="row" alignItems="center">
                            <Stack gap="0" flex="1">
                                <Box fontWeight="semibold" textStyle="sm">Ventas Totales</Box>
                                <Box textStyle="xs" color="fg.muted">Cant. Ventas</Box>
                            </Stack>
                            <Stat.Root size="sm" alignItems="flex-end">
                                <Span fontWeight="medium">
                                    <FormatNumber value={ventasTotales} />
                                </Span>
                                <Badge colorPalette={"green"} gap="0">
                                    <Stat.UpIndicator />
                                    <FormatNumber value={ingresosBrutos} style="currency" currency="USD" />
                                </Badge>
                            </Stat.Root>
                        </Card.Body>
                    </Card.Root>
                </Box>

                <Box display="flex" padding="40px" width="full">

                    <Box width="1/4">
                        <Chart.Root boxSize="200px" chart={chartPorcentajes} mx="auto">
                            <PieChart>
                                <Tooltip
                                    cursor={false}
                                    animationDuration={100}
                                    content={<Chart.Tooltip hideLabel />}
                                />
                                <Pie
                                    innerRadius={80}
                                    outerRadius={100}
                                    isAnimationActive={false}
                                    data={chartPorcentajes.data}
                                    dataKey={chartPorcentajes.key("value")}
                                    nameKey="name"
                                >
                                    <Label
                                        content={({ viewBox }) => (
                                            <Chart.RadialText
                                                viewBox={viewBox}
                                                title={`$ ${new Intl.NumberFormat("es-AR").format(gananciaNeta + costos)}`}
                                                description="Caja"
                                            />
                                        )}
                                    />
                                    {chartPorcentajes.data.map((item) => (
                                        <Cell key={item.color} fill={chartPorcentajes.color(item.color)} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </Chart.Root>
                    </Box>
                    <Box width="1/4">
                        <Chart.Root boxSize="200px" chart={chartUtilidad} mx="auto">
                            <PieChart>
                                <Tooltip
                                    cursor={false}
                                    animationDuration={100}
                                    content={<Chart.Tooltip hideLabel />}
                                />
                                <Pie
                                    innerRadius={80}
                                    outerRadius={100}
                                    isAnimationActive={false}
                                    data={chartUtilidad.data}
                                    dataKey={chartUtilidad.key("value")}
                                    nameKey="name"
                                >
                                    <Label
                                        content={({ viewBox }) => (
                                            <Chart.RadialText
                                                viewBox={viewBox}
                                                title={`$ ${new Intl.NumberFormat("es-AR").format(gananciaNeta + costos - totalGastos)}`}
                                                description="Total"
                                            />
                                        )}
                                    />
                                    {chartUtilidad.data.map((item) => (
                                        <Cell key={item.color} fill={chartUtilidad.color(item.color)} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </Chart.Root>
                    </Box>
                    <Box width="1/4" display="flex" flexDirection="column" alignContent="center" justifyContent="center">
                        <Chart.Root boxSize="200px" chart={chartGastos} mx="auto">
                            <PieChart>
                                <Tooltip
                                    cursor={false}
                                    animationDuration={100}
                                    content={<Chart.Tooltip hideLabel />}
                                />
                                <Pie
                                    innerRadius={80}
                                    outerRadius={100}
                                    isAnimationActive={false}
                                    data={chartGastos.data}
                                    dataKey={chartGastos.key("value")}
                                    nameKey="name"
                                >
                                    <Label
                                        content={({ viewBox }) => (
                                            <Chart.RadialText
                                                viewBox={viewBox}
                                                title={`$ ${new Intl.NumberFormat("es-AR").format(totalGastos)}`}
                                                description="Gastos"
                                            />
                                        )}
                                    />
                                    {chartGastos.data.map((item, index) => (
                                        <Cell key={index} fill={chartGastos.color(item.color)} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </Chart.Root>
                        <Modal trigger={<Button>Agregar nuevo gasto</Button>}>
                            <form onSubmit={handleSubmit(onValid)}>
                                <label>nombre</label>
                                <input type="text" {...register("name")} />
                                <label>total</label>
                                <input type="number" {...register("amount")} />
                                <Button type="submit">Crear</Button>
                            </form>
                        </Modal>
                    </Box>
                    <Box display="flex" flexDirection="column">
                        <Card.Root maxW="xs" size="sm">
                            <Card.Body flexDirection="row" alignItems="center">
                                <Stack gap="0" flex="1">
                                    <Box fontWeight="semibold" textStyle="sm">Caja inicial</Box>
                                    <Box textStyle="xs" color="fg.muted">Dia 1 del mes</Box>
                                </Stack>
                                <Stat.Root size="sm" alignItems="flex-end">
                                    <Span fontWeight="medium">
                                        <FormatNumber value={0} style="currency" currency="USD" />
                                    </Span>
                                </Stat.Root>
                            </Card.Body>
                        </Card.Root>
                        <Card.Root maxW="xs" size="sm">
                            <Card.Body flexDirection="row" alignItems="center">
                                <Stack gap="0" flex="1">
                                    <Box fontWeight="semibold" textStyle="sm">Caja Final</Box>
                                    <Box textStyle="xs" color="fg.muted">Último dia del mes</Box>
                                </Stack>
                                <Stat.Root size="sm" alignItems="flex-end">
                                    <Span fontWeight="medium">
                                        <FormatNumber value={gananciaNeta + costos - totalGastos} style="currency" currency="USD" />
                                    </Span>
                                    <Badge colorPalette={"green"} gap="0">
                                        <Stat.UpIndicator />
                                        <FormatNumber value={0} style="currency" currency="USD" />
                                    </Badge>
                                </Stat.Root>
                            </Card.Body>
                        </Card.Root>
                        <Button onClick={() => { alert("hola mundo") }}>Generar Reporte</Button>
                    </Box>
                </Box>


                {ventasProductos && (
                    <Box display="flex" width="full" justifyContent="space-around">
                        <ProductsChart ventasProductos={ventasProductos} total={true} />
                        <ProductsChart ventasProductos={ventasProductos} />
                        {ventasCategorias && (<ProductsChart ventasCategorias={ventasCategorias} />)}
                    </Box>
                )}

                <Table.Root marginLeft="60px" size="sm" striped>
                    <Table.Caption>Expenses inventory and pricing information</Table.Caption>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Gasto</Table.ColumnHeader>
                            <Table.ColumnHeader>Fecha</Table.ColumnHeader>
                            <Table.ColumnHeader>Precio Final</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {expenses && expenses.map((expense) => (
                            <Table.Row key={expense.id}>
                                <Table.Cell>{expense.name}</Table.Cell>
                                <Table.Cell>{expense.date}</Table.Cell>
                                <Table.Cell>$ {new Intl.NumberFormat("es-AR").format(expense.amount)}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </GridItem>
        </Grid >
    )
}
export default Dashboard;
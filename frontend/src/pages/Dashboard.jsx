import Modal from "../components/Modal"
import { BarList, Chart, useChart } from "@chakra-ui/charts"
import { Badge, Box, Card, Table, FormatNumber, Span, Stack, Stat, Input, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Cell, Label, Pie, PieChart, Tooltip } from "recharts"

export function ProductsChart({ ventasProductos, total }) {
    const chartData = ventasProductos.map((product) => ({
        name: `${product.productName} ${product.color} ${product.size}`,
        value: total ? product.totalVendido : product.cantidadVendido
    }))

    const chart = useChart({
        sort: { by: "value", direction: "desc" },
        data: chartData,
        series: [{ name: "name", color: "teal.subtle" }]
    })

    return (
        <BarList.Root chart={chart}>
            <BarList.Content>
                <BarList.Label title="Productos mas vendidos" flex="1">
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
    const [ventasProductos, setVentasProductos] = useState()
    const [filters, setFilters] = useState()
    const { register, handleSubmit } = useForm()

    useEffect(() => {
        const fetchMetrics = async () => {
            const query = new URLSearchParams(filters).toString()
            const res = await fetch(`http://localhost:3000/api/dashboard/metrics?${query}`)
            const data = await res.json()
            console.log(data)
            setIngresosBrutos(data.ingresos)
            setGananciaNeta(data.gananciaNeta)
            setVentasTotales(data.ventasTotales)
            setVentasProductos(data.ventasProductos)
            setTotalGastos(data.totalExpenses)
            setExpenses(data.expenses)
            setCostos(data.costos)
        }
        fetchMetrics()
    }, [filters])

    /* const chartMonths = useChart({
        data: [
            { sales: 63000, month: "June" },
            { sales: 72000, month: "July" },
            { sales: 85000, month: "August" },
            { sales: 79000, month: "September" },
            { sales: 90000, month: "October" },
            { sales: 95000, month: "November" },
            { sales: 88000, month: "December" },
        ],
        series: [{ name: "sales", color: "teal.solid" }],
    })

    const chartTime = useChart({
        data: [
            { sale: 10, month: "January" },
            { sale: 95, month: "February" },
            { sale: 87, month: "March" },
            { sale: 88, month: "May" },
            { sale: 65, month: "June" },
            { sale: 90, month: "August" },
        ],
        series: [{ name: "sale", color: "teal.solid" }],
    }) */

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

    const handleChangeDate = (value) => {
        const dateSplit = value.split('-')
        setFilters({ year: dateSplit[0], month: dateSplit[1], day: dateSplit[2] })
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
        <Box paddingTop="70px">
            <Input type="date" onChange={(e) => { handleChangeDate(e.target.value) }} />
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
                {/* <Box width="1/4">
                    <Box fontWeight="semibold" textStyle="sm">Ganancias por mes</Box>
                    <Chart.Root maxH="sm" chart={chartMonths}>
                        <BarChart data={chartMonths.data}>
                            <CartesianGrid stroke={chartMonths.color("border.muted")} vertical={false} />
                            <XAxis
                                axisLine={false}
                                tickLine={false}
                                dataKey={chartMonths.key("month")}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={chartMonths.formatNumber({
                                    style: "currency",
                                    currency: "USD",
                                    notation: "compact",
                                })}
                            />
                            <Tooltip
                                cursor={{ fill: chartMonths.color("bg.muted") }}
                                animationDuration={0}
                                content={<Chart.Tooltip />}
                            />
                            {chartMonths.series.map((item) => (
                                <Bar
                                    isAnimationActive={false}
                                    key={item.name}
                                    dataKey={chartMonths.key(item.name)}
                                    fill={chartMonths.color(item.color)}
                                />
                            ))}
                        </BarChart>
                    </Chart.Root>
                </Box>
                <Box width="1/4">
                    <Box fontWeight="semibold" textStyle="sm">
                        Ventas por mes
                    </Box>
                    <Chart.Root maxH="sm" chart={chartTime}>
                        <LineChart data={chartTime.data}>
                            <CartesianGrid stroke={chartTime.color("border")} vertical={false} />
                            <XAxis
                                axisLine={false}
                                dataKey={chartTime.key("month")}
                                tickFormatter={(value) => value.slice(0, 3)}
                                stroke={chartTime.color("border")}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tickMargin={10}
                                stroke={chartTime.color("border")}
                            />
                            <Tooltip
                                animationDuration={100}
                                cursor={false}
                                content={<Chart.Tooltip />}
                            />
                            {chartTime.series.map((item) => (
                                <Line
                                    key={item.name}
                                    isAnimationActive={false}
                                    dataKey={chartTime.key(item.name)}
                                    stroke={chartTime.color(item.color)}
                                    strokeWidth={2}
                                    dot={false}
                                />
                            ))}
                        </LineChart>
                    </Chart.Root>
                </Box> */}
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
                </Box>
            )}

            <Table.Root size="sm" striped>
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
        </Box>
    )
}
export default Dashboard;
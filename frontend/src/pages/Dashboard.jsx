import { BarList, Chart, useChart } from "@chakra-ui/charts"
import { Badge, Box, Card, FormatNumber, Span, Stack, Stat, Input, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Cell, Label, Pie, PieChart, Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis, LineChart, Line, Area, AreaChart } from "recharts"

function Dashboard() {
    const [ingresosBrutos, setIngresosBrutos] = useState()
    const [inversionTotal, setInversionTotal] = useState()
    const [ventasTotales, setVentasTotales] = useState()
    const [gananciaNeta, setGananciaNeta] = useState()
    const [filters, setFilters] = useState()

    useEffect(() => {
        const fetchMetrics = async () => {
            const query = new URLSearchParams(filters).toString()
            const res = await fetch(`http://localhost:3000/api/dashboard/metrics?${query}`)
            const data = await res.json()
            console.log(data)
            setIngresosBrutos(data.ingresos)
            setInversionTotal(data.inversion)
            setGananciaNeta(data.gananciaNeta)
            setVentasTotales(data.ventasTotales)
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
            { name: "Costo Recuperado", value: 10000/*inversionTotal ?? 0*/, color: "orange.solid" },
            { name: "Ganancia neta", value: 5000/*gananciaNeta ?? 0*/, color: "green.solid" },
            { name: "Caja", value: 100000/*gananciaNeta ?? 0*/, color: "blue.solid" },
        ],
    })

    const chartUtilidad = useChart({
        data: [
            { name: "gastos", value: 40000, color: "blue.solid" },
            { name: "utilidad", value: 61500, color: "pink.solid" },
        ],
    })
    const chartGastos = useChart({
        data: [
            { name: "luz", value: 400, color: "blue.solid" },
            { name: "wifi", value: 300, color: "orange.solid" },
            { name: "agua", value: 200, color: "pink.solid" },
            { name: "alquiler", value: 400, color: "green.solid" },
        ],
    })



    const chart = useChart({
        data: [
            { date: "2023-01", value: 145.43 },
            { date: "2023-02", value: 151.73 },
            { date: "2023-03", value: 157.65 },
            { date: "2023-04", value: 169.68 },
            { date: "2023-05", value: 173.75 },
            { date: "2023-06", value: 186.68 },
            { date: "2023-07", value: 181.99 },
            { date: "2023-08", value: 189.46 },
        ],
        series: [{ name: "value", color: "green.solid" }],
    })

    const closing = chart.data[chart.data.length - 1]
    const opening = chart.data[0]
    const trend = (closing.value - opening.value) / opening.value

    const handleChangeDate = (value) => {
        const dateSplit = value.split('-')
        setFilters({ year: dateSplit[0], month: dateSplit[1], day: dateSplit[2] })
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
                                <FormatNumber value={15000} style="currency" currency="USD" />
                            </Span>
                            <Badge colorPalette={trend > 0 ? "green" : "red"} gap="0">
                                <Stat.UpIndicator />
                                <FormatNumber value={trend} style="percent" maximumFractionDigits={2} />
                            </Badge>
                        </Stat.Root>
                    </Card.Body>
                </Card.Root>

                {/* <Card.Root maxW="xs" size="sm">
                    <Card.Body flexDirection="row" alignItems="center">
                        <Stack gap="0" flex="1">
                            <Box fontWeight="semibold" textStyle="sm">Inversión total</Box>
                            <Box textStyle="xs" color="fg.muted">Costos</Box>
                        </Stack>
                        <Stat.Root size="sm" alignItems="flex-end">
                            <Span fontWeight="medium">
                                <FormatNumber value={inversionTotal} style="currency" currency="USD" />
                            </Span>
                            <Badge colorPalette="green" gap="0">
                                <Stat.UpIndicator />
                                <FormatNumber value={trend} style="percent" maximumFractionDigits={2} />
                            </Badge>
                        </Stat.Root>
                    </Card.Body>
                </Card.Root> */}
                <Card.Root maxW="xs" size="sm">
                    <Card.Body flexDirection="row" alignItems="center">
                        <Stack gap="0" flex="1">
                            <Box fontWeight="semibold" textStyle="sm">Ganancia Neta</Box>
                            <Box textStyle="xs" color="fg.muted">Ventas - Costo</Box>
                        </Stack>
                        <Stat.Root size="sm" alignItems="flex-end">
                            <Span fontWeight="medium">
                                <FormatNumber value={5000} style="currency" currency="USD" />
                            </Span>
                            <Badge colorPalette={gananciaNeta > 0 ? "green" : "red"} gap="0">
                                {gananciaNeta > 0
                                    ? <Stat.UpIndicator />
                                    : <Stat.DownIndicator />
                                }
                                <FormatNumber value={trend} style="percent" maximumFractionDigits={2} />
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
                                <FormatNumber value={1} />
                            </Span>
                            <Badge colorPalette={trend > 0 ? "green" : "red"} gap="0">
                                <Stat.UpIndicator />
                                <FormatNumber value={15000} style="currency" currency="USD" />
                            </Badge>
                        </Stat.Root>
                    </Card.Body>
                </Card.Root>
                <Card.Root maxW="xs" size="sm">
                    <Card.Body flexDirection="row" alignItems="center">
                        <Stack gap="0" flex="1">
                            <Box fontWeight="semibold" textStyle="sm">Inventario</Box>
                            <Box textStyle="xs" color="fg.muted">Dinero congelado en stock</Box>
                        </Stack>
                        <Stat.Root size="sm" alignItems="flex-end">
                            <Span fontWeight="medium">
                                <FormatNumber value="100000" style="currency" currency="USD" />
                            </Span>
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
                                            title={`$ ${new Intl.NumberFormat("es-AR").format(115000)}`}
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
                                            title={`$ ${new Intl.NumberFormat("es-AR").format(115000)}`}
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
                <Box width="1/4">
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
                                            title={`$ ${new Intl.NumberFormat("es-AR").format(40000)}`}
                                            description="Gastos"
                                        />
                                    )}
                                />
                                {chartGastos.data.map((item) => (
                                    <Cell key={item.color} fill={chartGastos.color(item.color)} />
                                ))}
                            </Pie>
                        </PieChart>
                    </Chart.Root>
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
                                    <FormatNumber value={115000} style="currency" currency="USD" />
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
                                    <FormatNumber value={61500} style="currency" currency="USD" />
                                </Span>
                                <Badge colorPalette={"red"} gap="0">
                                    <Stat.DownIndicator />
                                    <FormatNumber value={40000} style="currency" currency="USD" />
                                </Badge>
                            </Stat.Root>
                        </Card.Body>
                    </Card.Root>
                    <Button onClick={() => { alert("hola mundo") }}>Generar Reporte</Button>
                </Box>
            </Box>
        </Box>
    )
}
export default Dashboard;
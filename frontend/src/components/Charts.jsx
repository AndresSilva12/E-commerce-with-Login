import { BarList, Chart, useChart } from "@chakra-ui/charts"
import { Badge, Box, Card, FormatNumber, Span, Stack, Stat } from "@chakra-ui/react"
import { Cell, Label, Pie, PieChart, Tooltip } from "recharts"

export function ChartProducts({ topProductosVentas, topCategorias, topProductosCantidad }) {
    const chartData = topProductosVentas
        ? topProductosVentas.map((item) => ({
            name: `${item.productName} ${item.color} ${item.size}`,
            value: item.totalVendido
        }))
        : topProductosCantidad
            ? topProductosCantidad.map((item) => ({
                name: `${item.productName} ${item.color} ${item.size}`,
                value: item.cantidadVendido
            }))
            : topCategorias.map((item) => ({
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
                <BarList.Label title={topProductosVentas || topProductosCantidad ? 'Productos mas vendidos' : 'Categorias mas vendidas'} flex="1">
                    <BarList.Bar />
                </BarList.Label>
                <BarList.Value />
            </BarList.Content>
        </BarList.Root>
    )
}

export function ChartPie({ value }) {
    const colors = [
        { color: "green.solid" },
        { color: "orange.solid" },
        { color: "cyan.solid" },
        { color: "pink.solid" },
        { color: "yellow.solid" },
        { color: "purple.solid" },
        { color: "teal.solid" },
        { color: "blue.solid" },
    ]
    const total = value.map(item => item.value).reduce((acc, curr) => acc + curr, 0)
    const chartData = value.map(item => ({
        name: item.name,
        value: item.value
    }))
    const chart = useChart({
        data: chartData
    })
    return (
        <Chart.Root boxSize="200px" chart={chart} mx="auto" marginBottom="60px">
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
                    data={chart.data}
                    dataKey={chart.key("value")}
                    nameKey="name"
                >
                    <Label
                        content={({ viewBox }) => (
                            <Chart.RadialText
                                viewBox={viewBox}
                                title={`$ ${new Intl.NumberFormat("es-AR").format(total)}`}
                                description="Caja"
                            />
                        )}
                    />
                    {colors.map((color) => (
                        <Cell key={color.color} fill={chart.color(color.color)} />
                    ))}
                </Pie>
            </PieChart>
        </Chart.Root>
    )
}

export function ChartCard({ value, title, subtitle }) {
    return (
        <Card.Root maxW="xs" size="sm">
            <Card.Body flexDirection="row" alignItems="center">
                <Stack gap="0" flex="1">
                    <Box fontWeight="semibold" textStyle="sm">{title}</Box>
                    <Box textStyle="xs" color="fg.muted">{subtitle}</Box>
                </Stack>
                <Stat.Root size="sm" alignItems="flex-end">
                    <Span fontWeight="medium">
                        <FormatNumber value={value} style="currency" currency="USD" />
                    </Span>
                    <Badge colorPalette={"green"} gap="0">
                        <Stat.UpIndicator />
                        <FormatNumber value={1000} style="percent" maximumFractionDigits={2} />
                    </Badge>
                </Stat.Root>
            </Card.Body>
        </Card.Root>
    )
}
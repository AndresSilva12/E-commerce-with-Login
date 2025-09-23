import Modal from "../components/Modal"
import { BarList, Chart, useChart } from "@chakra-ui/charts"
import { Badge, Box, Card, Table, FormatNumber, Fieldset, Field, Input, Strong, NumberInput, Portal, Span, Stack, Stat, Grid, GridItem, Button, Select, createListCollection } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Cell, Label, Pie, PieChart, Tooltip } from "recharts"
import Calendar from "react-calendar"
import { useExpenses } from "../hooks/useExpenses.js"
import { zodResolver } from "@hookform/resolvers/zod"
import { expensesSchema, updateExpensesSchema } from "../../../validation/expensesSchema.js"
import { Toaster } from "../components/ui/toaster";
import { useMetrics } from "../hooks/useMetrics.js"
import { generatePdfReport } from "../utils/pdfReport.js"
import { MdOutlineSimCardDownload } from "react-icons/md";
import { LuCalendarDays, LuCalendarX2, LuSquarePen, LuTrash2 } from "react-icons/lu";

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

export function ExpensesModal({ expenseUpdate, onSubmitExpense }) {
    const { createExpense, updateExpense } = useExpenses()
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: zodResolver(expenseUpdate ? updateExpensesSchema : expensesSchema)
    })

    useEffect(() => {
        if (expenseUpdate === null) {
            reset({ name: "", amount: 0 })
        } else {
            reset(expenseUpdate)
        }
    }, [expenseUpdate, reset])

    const onValid = async (data) => {
        expenseUpdate ? await updateExpense(data, expenseUpdate.id) : await createExpense(data)
        onSubmitExpense()
    }

    return (
        <form onSubmit={handleSubmit(onValid)}>
            <Box display="flex" flexDirection="column" justifyContent="center" gap="4">
                <Fieldset.Root>
                    <Fieldset.Content>
                        <Field.Root invalid={!!errors.name}>
                            <Box display="flex" gap="4" width="100%" justifyContent="space-between">
                                <Field.Label width="50%">Nombre del gasto</Field.Label>
                                <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                                <Box width="50%">
                                    <Input {...register("name")} />
                                </Box>
                            </Box>
                        </Field.Root>
                        <Field.Root invalid={!!errors.amount}>
                            <Box display="flex" gap="4" width="100%" justifyContent="space-between">
                                <Field.Label width="50%">Total</Field.Label>
                                <Field.ErrorText>{errors.amount?.message}</Field.ErrorText>
                                <Box width="50%">
                                    <NumberInput.Root defaultValue="1">
                                        <NumberInput.Control />
                                        <NumberInput.Input  {...register("amount")} />
                                    </NumberInput.Root>
                                </Box>
                            </Box>
                        </Field.Root>
                    </Fieldset.Content>
                </Fieldset.Root>
                <Button type="submit">{expenseUpdate ? "Actualizar" : "Crear"} Gasto</Button>
            </Box>
        </form>
    )
}

function Dashboard() {
    const { deleteExpense } = useExpenses()
    const { metrics, fetchMetrics, filters, setFilters, topProductosCantidad, topProductosVentas, ingresosBrutos, topCategorias, ventasTotales, gananciaNeta, totalGastos, expenses, costos } = useMetrics()
    const [expenseUpdate, setExpenseUpdate] = useState(null)
    const [dateBy, setDateBy] = useState()

    useEffect(() => {
        fetchMetrics()
    }, [filters])

    const dateFilters = createListCollection({
        items: [
            { label: "Este día", value: "day" },
            { label: "Este mes", value: "month" },
            { label: "Este año", value: "year" },
        ],
    })

    const chartPorcentajes = [
        { name: "Costo Recuperado", value: costos },
        { name: "Ganancia neta", value: gananciaNeta ?? 0 },
    ]

    const chartUtilidad = [
        { name: "gastos", value: totalGastos },
        { name: "utilidad", value: gananciaNeta + costos - totalGastos },
    ]

    const chartGastos = expenses.map((expense) => ({
        name: expense.name,
        value: Number(expense.amount),
    }))

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

    const handleDeleteExpense = async (id) => {
        const idDeleted = await deleteExpense(id)
        if (idDeleted) setFilters({})
    }

    return (
        <Grid templateColumns="repeat(8, 1fr)" templateRows="repeat(10, 1fr)">
            <GridItem rowSpan={10} colSpan={1} padding="4" bg="black" width="290px" display="flex" flexDirection="column" gap="4" position="fixed" top="70px" zIndex="50" bottom="0" borderRightColor={'gray.500'} borderRightWidth="2px">
                <Box display="flex" justifyContent="space-between" alignItems="center" width="full">
                    <Box display="flex" justifyContent="initial" alignItems="center">
                        <Strong>Filtrar por fecha</Strong>
                        <LuCalendarDays />
                    </Box>
                    <Button onClick={() => setFilters({})} width="120px">
                        Borrar Filtros
                        <LuCalendarX2 />
                    </Button>
                </Box>
                <Box display="flex" gap="2">
                    <Select.Root collection={dateFilters} value={dateBy} defaultValue={"Hoy"} onValueChange={(e) => { handleChangeDate(new Date(), String(e.value)) }} size="sm" width="full">
                        <Select.HiddenSelect />
                        <Select.Control>
                            <Select.Trigger>
                                <Select.ValueText placeholder="Este día" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                                <Select.Indicator />
                            </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal color="red">
                            <Select.Positioner>
                                <Select.Content zIndex="9999">
                                    {dateFilters.items.map((dateFilter) => (
                                        <Select.Item item={dateFilter} key={dateFilter.value}>
                                            {dateFilter.label}
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Portal>
                    </Select.Root>
                </Box >
                <Box width="full">
                    <Calendar
                        onClickMonth={(value, e) => { handleChangeDate(value, "month") }}
                        onClickYear={(value, e) => { handleChangeDate(value, "year") }}
                        onClickDay={(value, e) => { handleChangeDate(value, "day") }}
                    />
                </Box>
            </GridItem >

            <GridItem rowSpan={9} colSpan={7} display="flex" flexDirection="column" marginLeft="260px" marginTop="80px" width="92%">
                {/* Cards de datos principales */}
                <Box display="flex" width="full" justifyContent="center" gap="10">
                    <ChartCard value={ingresosBrutos} title={"Ingresos Brutos"} subtitle={"Ventas"} />
                    <ChartCard value={gananciaNeta} title={"Ganancia Neta"} subtitle={"Ventas - Costo"} />
                    <ChartCard value={ventasTotales} title={"Ventas Totales"} subtitle={"Cant. Ventas"} />
                </Box>

                {/* Estadisticas en grafico circular */}
                <Box display="flex" padding="40px" width="full" justifyContent="center" alignItems="center">

                    <Box width="1/4" marginBottom="65px">
                        <ChartPie value={chartPorcentajes} />
                    </Box>

                    <Box width="1/4" marginBottom="65px">
                        <ChartPie value={chartUtilidad} />
                    </Box>

                    <Box width="1/4" display="flex" flexDirection="column" justifyContent="center" gap="2">
                        <ChartPie value={chartGastos} />
                        <Box width="full" height="50px" display="flex" justifyContent="center">
                            <Modal size={"sm"} trigger={<Button onClick={() => { setExpenseUpdate(null) }}>Agregar nuevo gasto</Button>}>
                                {({ closeModal }) => (
                                    <ExpensesModal expenseUpdate={expenseUpdate} onSubmitExpense={() => {
                                        closeModal()
                                        setFilters({})
                                    }} />
                                )}
                            </Modal>
                        </Box>
                    </Box>

                    <Box display="flex" flexDirection="column">
                        <ChartCard value={gananciaNeta + costos - totalGastos} title={"Caja Final"} subtitle={"Total de utilidad"} />
                        <Button onClick={() => { generatePdfReport(metrics) }}>
                            Generar Reporte
                            <MdOutlineSimCardDownload />
                        </Button>
                    </Box>

                </Box>

                {/* barCharts horizontales */}
                {topProductosVentas && (
                    <Box display="flex" width="full" justifyContent="space-around">
                        <ChartProducts topProductosVentas={topProductosVentas} />
                        <ChartProducts topProductosCantidad={topProductosCantidad} />
                        {topCategorias && (<ChartProducts topCategorias={topCategorias} />)}
                    </Box>
                )}

                {/* Tabla de gastos */}
                <Table.Root marginLeft="60px" size="sm" striped width="90%">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Gasto</Table.ColumnHeader>
                            <Table.ColumnHeader>Fecha</Table.ColumnHeader>
                            <Table.ColumnHeader>Precio Final</Table.ColumnHeader>
                            <Table.ColumnHeader>Editar/Eliminar</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {expenses && expenses.map((expense) => (
                            <Table.Row key={expense.id}>
                                <Table.Cell>{expense.name}</Table.Cell>
                                <Table.Cell>{expense.date.slice(0, 10)}</Table.Cell>
                                <Table.Cell>$ {new Intl.NumberFormat("es-AR").format(expense.amount)}</Table.Cell>
                                <Table.Cell>
                                    <Box display="flex" gap="2">
                                        <Modal size={"sm"} trigger={
                                            <Button onClick={() => { setExpenseUpdate(expense) }}>
                                                <LuSquarePen />
                                            </Button>
                                        }>
                                            {({ closeModal }) => (
                                                <ExpensesModal expenseUpdate={expenseUpdate} onSubmitExpense={() => {
                                                    closeModal()
                                                    setFilters({})
                                                }} />
                                            )}
                                        </Modal>
                                        <Modal size={"sm"} trigger={
                                            <Button colorPalette="red">
                                                <LuTrash2 />
                                            </Button>
                                        }>
                                            <h2 >Está seguro que desea eliminar este gasto?</h2>
                                            <Button onClick={() => { handleDeleteExpense(expense.id) }}>Eliminar</Button>
                                        </Modal>
                                    </Box>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>

            </GridItem>
            <Toaster />
        </Grid >
    )
}
export default Dashboard;
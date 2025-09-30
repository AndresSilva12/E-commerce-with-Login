import Modal from "../components/Modal"
import DateFilters from "../components/DateFilters"
import { Box, Table, Grid, GridItem, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useExpenses } from "../hooks/useExpenses.js"
import { Toaster } from "../components/ui/toaster";
import { useMetrics } from "../hooks/useMetrics.js"
import { generatePdfReport } from "../utils/pdfReport.js"
import { MdOutlineSimCardDownload } from "react-icons/md";
import { LuSquarePen, LuTrash2 } from "react-icons/lu";
import { ChartCard, ChartPie, ChartProducts } from "../components/Charts"
import ExpenseModal from "../components/ExpenseModal"

function Dashboard() {
    const { deleteExpense } = useExpenses()
    const { metrics, fetchMetrics, filters, setFilters, topProductosCantidad, topProductosVentas, ingresosBrutos, topCategorias, ventasTotales, gananciaNeta, totalGastos, expenses, costos } = useMetrics()
    const [expenseUpdate, setExpenseUpdate] = useState(null)

    useEffect(() => {
        fetchMetrics()
    }, [filters])

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

    const handleDeleteExpense = async (id) => {
        const idDeleted = await deleteExpense(id)
        if (idDeleted) setFilters({})
    }

    return (
        <Grid templateColumns="repeat(8, 1fr)" templateRows="repeat(10, 1fr)">
            <GridItem rowSpan={10} colSpan={1} padding="4" bg="black" width="290px" display="flex" flexDirection="column" gap="4" position="fixed" top="70px" zIndex="50" bottom="0" borderRightColor={'gray.500'} borderRightWidth="2px">
                <DateFilters setFilters={setFilters} />
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
                            <Modal size={"sm"} title="Crear nuevo gasto" trigger={<Button onClick={() => { setExpenseUpdate(null) }}>Agregar nuevo gasto</Button>}>
                                {({ closeModal }) => (
                                    <ExpenseModal expenseUpdate={expenseUpdate} onSubmitExpense={() => {
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
                                        <Modal size={"sm"} title="Editar Gasto" trigger={
                                            <Button onClick={() => { setExpenseUpdate(expense) }}>
                                                <LuSquarePen />
                                            </Button>
                                        }>
                                            {({ closeModal }) => (
                                                <ExpenseModal expenseUpdate={expenseUpdate} onSubmitExpense={() => {
                                                    closeModal()
                                                    setFilters({})
                                                }} />
                                            )}
                                        </Modal>
                                        <Modal size={"sm"} title="Eliminar gasto" trigger={
                                            <Button colorPalette="red">
                                                <LuTrash2 />
                                            </Button>
                                        } footer={<Button onClick={() => { handleDeleteExpense(expense.id) }}>Eliminar</Button>}>
                                            <h2 >Está seguro que desea eliminar este gasto?</h2>
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
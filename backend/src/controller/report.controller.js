import PDFDocument from "pdfkit-table"


export const createReport = async(req, res) => {
    const {metrics} = req.body
    
    res.setHeader("Content-Type","application/json")
    res.setHeader("Content-Disposition", "attachment; filename=\"reporte.pdf\"")

    const doc = new PDFDocument({
        size: "A4",
        margin: 50
    })

    doc.pipe(res)

    doc.image('./uploads/logo-1073472548-1737474754-391836cf8fc2677c238a05fe4b5922201737474754-320-0.jpg', 50, 10, {fit: [100, 100], align: 'center', valign: 'center'})

    doc.fontSize(20).text(`Reporte de Balance General\nPeríodo ${metrics.fechaInicio.slice(0,10)} - ${metrics.fechaFin.slice(0,10)}`, {align: "center"})
    doc.moveDown(2)

    const tablePrincipal = {
      title: "Resumen Contable",
      headers: [
        {label: "Descripcion", headerAlign: "left", headerColor: "#eaeaea", headerOpacity: 10},
        {label: "Monto", headerAlign: "right", align: "right", headerColor: "#eaeaea", headerOpacity: 10}
      ],
      rows: [
        [ "Ventas Totales", ` ${metrics.ventasTotales}` ],
        [ "Ingresos Brutos", `$ ${new Intl.NumberFormat("es-AR").format(metrics.ingresos)}` ],
        [ "Costos", `$ ${new Intl.NumberFormat("es-AR").format(metrics.costos)}` ],
        [ "Ganancia Neta", `$ ${new Intl.NumberFormat("es-AR").format(metrics.gananciaNeta)}` ],
        [ "Gastos", `- $ ${new Intl.NumberFormat("es-AR").format(metrics.totalExpenses)}` ],
        [ "Total", ` $ ${new Intl.NumberFormat("es-AR").format(metrics.ingresos - metrics.totalExpenses)}` ],
      ],
    };
    await doc.table(tablePrincipal, {width: 500}),
    doc.moveDown(1)


    const tableGastos = {
      title: "Detalle de Gastos",
      headers: [ 
        {label: "Fecha", width: 100, headerColor: "#eaeaea", headerOpacity: 10},
        {label: "Concepto", width: 100, headerColor: "#eaeaea", headerOpacity: 10},
        {label: "Monto", width: 100, align: "right", headerAlign: "right", headerColor: "#eaeaea", headerOpacity: 10},
      ],
      rows: metrics.expenses.map((expense) => ([expense.date.slice(0,10), expense.name , `$ ${new Intl.NumberFormat("es-AR").format(expense.amount)}` ])),
    };
    await doc.table(tableGastos, {width: 400})
    doc.moveDown(1)

    const tableProductos = {
      title: "Productos más vendidos",
      headers: [
        {label: "Producto", headerColor: "#eaeaea", headerOpacity: 10},
        {label: "Color", headerColor: "#eaeaea", headerOpacity: 10},
        {label: "Talle", headerColor: "#eaeaea", headerOpacity: 10},
        {label: "Cantidad", headerColor: "#eaeaea", headerOpacity: 10},
        {label: "Total Vendido", align: "right", headerAlign: "right", headerColor: "#eaeaea", headerOpacity: 10},
        {label: "Costo Total", align: "right", headerAlign: "right", headerColor: "#eaeaea", headerOpacity: 10},
        {label: "Ganancia", align: "right", headerAlign: "right", headerColor: "#eaeaea", headerOpacity: 10},
      ],
      rows: metrics.topProductosVentas.map((p) => [p.productName, p.color, p.size, `${p.cantidadVendido}`,`$ ${new Intl.NumberFormat("es-AR").format(p.totalVendido)}`, `$ ${new Intl.NumberFormat("es-AR").format(p.totalCosto)}`, `$ ${new Intl.NumberFormat("es-AR").format(p.gananciaDelProducto)}`])
    }
    await doc.table(tableProductos, {width: 500})
    doc.moveDown(1)

    const tableCategorias = {
      title: "Categorías más vendidas",
      headers: ["Categoría", "Cantidad"],
      rows: metrics.topCategorias.map((categoria) => ([ `${categoria.name}`, `${categoria.quantity}`]))
    }
    await doc.table(tableCategorias, {width: 300})
    doc.moveDown(1)


    doc.end()
}   
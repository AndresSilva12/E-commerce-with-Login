import PDFDocument from "pdfkit"


export const createReport = async(req, res) => {
    const {metrics} = req.body
    /* res.json({reporteGenerado: metrics}) */
    
    res.setHeader("Content-Type","application/json")
    res.setHeader("Content-Disposition", "attachment; filename=\"reporte.pdf\"")

    const doc = new PDFDocument({
        size: "A4",
        margin: 50
    })

    doc.pipe(res)

    doc.fontSize(20).text("Reporte mensual", {align: "center"})

    doc.end()
}   
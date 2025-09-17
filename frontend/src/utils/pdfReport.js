export const generatePdfReport = async (metrics) => {
    try {
        const res = await fetch('http://localhost:3000/api/report', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(metrics),
            credentials: "include"
        })
        if (!res.ok) throw new Error("Error al generar el reporte PDF")
        const blob = await res.blob()
    
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
    
        a.href = url
        a.download = "reporte.pdf"
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)
    } catch (error) {
        console.log(error.message)
    }
}
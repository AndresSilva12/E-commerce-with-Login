export const getReport = async() => {

}

export const createReport = async(req, res) => {
    const {metrics} = req.body
    res.json({reporteGenerado: metrics})
}   
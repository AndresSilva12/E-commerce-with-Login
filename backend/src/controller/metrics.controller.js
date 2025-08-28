import prisma from "../db.js"

export const getMetrics = async(req, res) => {
    try {
        const year = Number(req.query.year)
        const month = Number(req.query.month)
        const day = Number(req.query.day)
        const where = {}
        if (year || month || day){
            where.date = {}
            if (year) {
                where.date.gte = new Date(year,0,1)
                where.date.lt = new Date(year +1, 0,1)
                if (month){
                    where.date.gte = new Date(year, month -1, 1)
                    where.date.lt = new Date(year, month, 1)
                    if (day){
                        where.date.gte = new Date(year, month -1 , day)
                        where.date.lt = new Date(year, month, day + 1)
                    }
                }
            }
        }
        console.log(where.date)
        const sales = await prisma.sales.aggregate({
            _sum: {
                totalPrice: true
            },
            _count: {
                _all: true
            },
            where
        })
        
        const inversion = await prisma.stockEntry.aggregate({
            _sum: {
                total: true
            },
            where
        })
        const gananciaNeta = (sales._sum.totalPrice - inversion._sum.total)
        const ventasTotales = sales._count._all
        return res.json({ingresos: sales._sum.totalPrice , inversion: inversion._sum.total, gananciaNeta: gananciaNeta, ventasTotales: ventasTotales})
    } catch (error) {
        console.log(error)
    }

}
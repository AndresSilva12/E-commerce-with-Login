import prisma from "../db.js"

export const getMetrics = async(req, res) => {
    try {
        const currentDate = new Date()
        const year = Number(req.query.year) || currentDate.getFullYear()
        const month = Number(req.query.month) || currentDate.getMonth()
        const minDay = Number(req.query.minDay) || 1
        const lastDayMonth = new Date (year, month, 0)
        const maxDay = Number(req.query.maxDay) || lastDayMonth.getDate()
        const where = {}
        where.date = {}
        if (req.query.year){
            if (req.query.month){
                where.date.gte= new Date (year, month -1, minDay)
                if (req.query.minDay){
                    if (req.query.maxDay){
                        where.date.lt = new Date (year, month -1, maxDay +1)
                    }else {
                        where.date.lt = new Date (year, month - 1, minDay + 1)
                    }
                }else {
                    where.date.lt = new Date (year, month -1, maxDay +1)
                }
            }else {
                where.date.gte = new Date (year, 0, 1)
                where.date.lt = new Date (year + 1, 0, 0)
            }
        }else {
            where.date.gte = new Date (year, month, minDay)
            where.date.lt = new Date (year, month, maxDay)
        }
        
        const sales = await prisma.sales.findMany({
            where,
            include: {
                items: true
            }
        })

        //Traemos todas las unidades vendidas agrupadas por variante
        const salesByProduct = await prisma.saleItem.groupBy({
            by: "variantId",
            _sum: {
                quantity: true, //cantidad de unidades vendidas
            },
            
            where: {
                sale: {
                    date: {
                        gte: where.date.gte,
                        lt: where.date.lt
                    }
                }
            }
        })

        const variantIds = salesByProduct.map(sale => sale.variantId)

        const salesWithInfo = await prisma.saleItem.findMany({
            where:{
                sale: {
                    date: {
                        gte: where.date.gte,
                        lt: where.date.lt
                    }
                },
                variantId: {
                    in: variantIds
                }
            },
            include: {
                variant: {
                    include: {
                        product: true
                    }
                }
            }
        })
        
        const ventasProductos = salesByProduct.map((sale => {
            const cantidadTotal = sale._sum.quantity
            const saleInfo = salesWithInfo.filter(s => s.variantId === sale.variantId)
            const totalVentas = saleInfo.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)
            const totalCosto = saleInfo.reduce((acc, item) => acc + item.purchasePrice * item.quantity, 0)
            return {
                productName: saleInfo[0].variant.product.name,
                code: saleInfo[0].variant.code,
                totalVendido: totalVentas,
                cantidadVendido: cantidadTotal,
                totalCosto: totalCosto,
                gananciaDelProducto: totalVentas - totalCosto
            }
        }))

        const ingresos = sales.reduce((accumulator, sale) => accumulator + Number(sale.totalPrice), 0)
        const ventasTotales = sales.length
        const costos = Number(sales.flatMap(sale => sale.items.map(item => Number(item.purchasePrice) * item.quantity)).reduce((accumulator, currentPrice) => accumulator + currentPrice, 0).toFixed(2))
        const gananciaNeta = ingresos - costos
        const expenses = await prisma.expenses.findMany({where})
        const totalExpenses = expenses.reduce((accumulator, currentValue) => accumulator + Number(currentValue.amount), 0)
        return res.json({ingresos: ingresos , ventasTotales: ventasTotales, expenses: expenses, totalExpenses: totalExpenses, costos: costos, gananciaNeta: gananciaNeta, ventasProductos: ventasProductos})

    } catch (error) {
        console.log(error)
    }

}
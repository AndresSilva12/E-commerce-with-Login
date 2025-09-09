import prisma from "../db.js"
import { filterByDate } from "../utils/filterByDate.js"

export const getMetrics = async(req, res) => {
    try {
        const topN = 5
        const where = filterByDate(req.query)       
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
                        product: {
                            include: {
                                category: true
                            }
                        }
                    }
                }
            }
        })

        const categorias = salesWithInfo.reduce((acc, sale) => {
            const categoria = sale.variant.product.category.name
            if (!acc[categoria]) {
                acc[categoria] = 0
            }
            acc[categoria] += sale.quantity
            return acc
        }, {})

        const ventasCategorias = Object.entries(categorias).map(([categoria, cantidad]) => ({
            name: categoria,
            quantity: cantidad
        })).sort((a, b) => b.quantity - a.quantity)

        const topCategorias = [...ventasCategorias].slice(0, topN)
        
        const ventasProductos = salesByProduct.map((sale => {
            const cantidadTotal = sale._sum.quantity
            const saleInfo = salesWithInfo.filter(s => s.variantId === sale.variantId)
            const totalVentas = saleInfo.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)
            const totalCosto = saleInfo.reduce((acc, item) => acc + item.purchasePrice * item.quantity, 0)
            return {
                productName: saleInfo[0].variant.product.name,
                color: saleInfo[0].variant.color,
                size: saleInfo[0].variant.size,
                totalVendido: totalVentas,
                cantidadVendido: cantidadTotal,
                totalCosto: totalCosto,
                gananciaDelProducto: totalVentas - totalCosto
            }
        }))
        const topProductosCantidad = [...ventasProductos].sort((a, b) => b.cantidadVendido - a.cantidadVendido).slice(0, topN)
        const topProductosVentas = [...ventasProductos].sort((a,b) => b.totalVendido - a.totalVendido).slice(0, topN)

        const ingresos = sales.reduce((accumulator, sale) => accumulator + Number(sale.totalPrice), 0)
        const ventasTotales = sales.length
        const costos = Number(sales.flatMap(sale => sale.items.map(item => Number(item.purchasePrice) * item.quantity)).reduce((accumulator, currentPrice) => accumulator + currentPrice, 0).toFixed(2))
        const gananciaNeta = ingresos - costos
        const expenses = await prisma.expenses.findMany({where})
        const totalExpenses = expenses.reduce((accumulator, currentValue) => accumulator + Number(currentValue.amount), 0)

        return res.json({
            fechaInicio: where.date.gte,
            fechaFin: where.date.lt,
            ingresos: ingresos , //total vendido en dinero (ingresosBrutos)
            ventasTotales: ventasTotales, //cantidad de ventas totales
            expenses: expenses, //array de todos los gastos del mes
            totalExpenses: totalExpenses, //total de todos los gastos en dinero
            costos: costos, //recuperación de lo invertido en base a precio promedio ponderado en cada una de las unidades vendidas * cantidad
            gananciaNeta: gananciaNeta, //ingresos brutos - costos
            topProductosVentas: topProductosVentas, //top 5 productos más vendidos
            topProductosCantidad: topProductosCantidad, //top 5 productos con unidades mas vendidas
            topCategorias: topCategorias, // top 5 categorias más vendidas
        })

    } catch (error) {
        console.log(error)
    }

}
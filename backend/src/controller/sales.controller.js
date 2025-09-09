import prisma from "../db.js"
import { filterByDate } from "../utils/filterByDate.js"
export const createNewSale = async(req, res) => {
    try {
        const userId = req.user.id
        const result = await prisma.$transaction(async (tx) => {
            const newSale = await tx.sales.create({
                data: {
                    totalPrice: req.body.totalPrice,
                    userId: userId,
                    items: {
                        create: req.body.items.map((item)=> ({
                            variantId: item.variantId,
                            quantity: item.quantity,
                            unitPrice: item.unitPrice,
                            purchasePrice: item.purchasePrice
                        }))
                    },
                    motive: req.body.motive || "Venta"
                },
                include: {
                    items: true
                }
            })
            const variantsUpdates = {}
            for (const item of newSale.items){
                const variantWithStockUpdated = await tx.productVariant.update({
                    where: {
                        id: item.variantId
                    },
                    data:{
                        stock: {
                            decrement: item.quantity
                        }
                    }
                })
                variantsUpdates[variantWithStockUpdated.code] = variantWithStockUpdated
            }
            return {newSale,variantsUpdates}
        })
        return res.json({sale: result.newSale, updatedVariants: result.variantsUpdates})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error interno durante el proceso" });
    }
}

export const getAllSales = async(req, res) => {
    try {
        const LIMIT = 8
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * LIMIT
        const take = LIMIT

        const where = filterByDate(req.query)
        const totalCount = await prisma.sales.count({where})


        const allSales = await prisma.sales.findMany({
            include: {
                items: {
                    include: {
                        variant: {
                            include: {
                                product: true
                            }
                        }
                    }
                },
                user: true
            },
            where,
            skip,
            take,
            orderBy: {date: 'desc'}
        })

        const totalPages = Math.ceil(totalCount / LIMIT)

        return res.json({
            allSales,
            pagination:{
                total: totalCount,
                page: page,
                totalPages: totalPages,
                limit: LIMIT
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error interno durante el proceso" });
    }
}

export const deleteSale = async(req, res) => {
    try {
        const result = await prisma.$transaction( async(tx) => {
            const sale = req.sale
            const variantsThatNotExist = {}
            for (const item of sale.items){
                const variantExist = await tx.productVariant.findFirst({where: {id: item.variantId}})
                if (!variantExist) {
                    variantsThatNotExist[item.variantId] = `variante inexistente: ${item.variantId}`
                    continue
                }
            }
            if (Object.keys(variantsThatNotExist).length > 0) throw new Error(JSON.stringify(variantsThatNotExist))

            const saleDeleted = await tx.sales.delete({
                where: {
                    id: sale.id
                },
                include: {
                    items: true
                }
            })

            const variantsUpdates = {}
            for (const item of saleDeleted.items){
                const variantReverted = await tx.productVariant.update({
                    where: {id: item.variantId},
                    data: {
                        stock: {
                            increment: item.quantity
                        }
                    }
                })
                variantsUpdates[variantReverted.code] = variantReverted
            }

            return {saleDeleted, variantsUpdates}
        })
        return res.json({saleDeleted: result.saleDeleted, variantsUpdates: result.variantsUpdates})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error interno durante el proceso" });
    }
}
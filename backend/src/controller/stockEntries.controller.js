import prisma from "../db.js"
import { filterByDate } from "../utils/filterByDate.js"

export const createStockEntry = async(req, res) => {
    try {
        const userId = req.user.id
        const result = await prisma.$transaction(async(tx) => {
            const newStockEntry = await tx.stockEntry.create({
                data: {
                    userId: userId,
                    items: {
                        create: req.body.items.map((item)=> ({
                            quantity: item.quantity,
                            variantId: item.variantId,
                            purchasePrice: item.purchasePrice
                        }))
                    },
                    total: req.body.total,
                    motive: req.body.motive || "Stock Inicial"
                },
                include: {
                    items: true
                }
            })
        
            const variantsUpdates = []
            for (const item of newStockEntry.items){
                const variantWithStockUpdated = await tx.productVariant.update({
                    where: {
                        id: item.variantId
                    },
                    data: {
                        stock: {
                            increment: item.quantity
                        }
                    },
                    include: {
                        product:{
                            include: {
                                category: true
                            }
                        }
                    }
                })
                variantsUpdates.push(variantWithStockUpdated)
            }
            
            return {newStockEntry, variantsUpdates}
        })
        res.json({
                stockEntry: result.newStockEntry,
                updatedVariants: result.variantsUpdates
        })
    } catch (error) {
        return res.status(500).json({ error: "Error interno durante el proceso" });
    }
}

export const getAllStockEntries = async(req, res) => {
    try {
        const LIMIT = 8
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * LIMIT
        const take = LIMIT

        const where = filterByDate(req.query)
        const totalCount = await prisma.stockEntry.count({where})

        const allStockEntries = await prisma.stockEntry.findMany({
        include: {
            items: {
                include:{
                    variant:{
                        include:{
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

        const totalPages = Math.ceil( totalCount / LIMIT)


        return res.json({
            allStockEntries,
            pagination: {
                totalCount: totalCount,
                totalPages: totalPages,
                page: page,
                limit: LIMIT
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error interno durante el proceso" });
    }
}

export const deleteEntry = async(req, res) =>{
    try {
        const result = await prisma.$transaction( async(tx) => {
            const stockEntry = req.stockEntry
            const variantsThatNotExist = {}
            const lowStock = {}
            for (const item of stockEntry.items){
                const variantExist = await tx.productVariant.findFirst({where: {id: item.variantId}})
                if (!variantExist){
                    variantsThatNotExist[item.variantId] = `Variante inexistente: ${item.variantId}`
                    continue
                }
                if (variantExist.stock < item.quantity){
                    return res.status(400).json({error: `Stock de '${variantExist.code}' por debajo de la cantidad`})
                }
            }
            if (Object.keys(variantsThatNotExist).length > 0) throw new Error(JSON.stringify(variantsThatNotExist))
            if (Object.keys(lowStock).length > 0) throw new Error(JSON.stringify(lowStock))

            const entryDeleted = await tx.stockEntry.delete({
                where: {
                    id: stockEntry.id
                },
                include: {
                    items: true
                }
            })

            const variantsUpdates = {}
            for (const item of entryDeleted.items){
                const variantReverted = await tx.productVariant.update({
                    where: {id: item.variantId},
                    data: {stock: {decrement: item.quantity}}
                })
                variantsUpdates[variantReverted.code] = variantReverted
            }

            return {entryDeleted, variantsUpdates}
        })
        return res.json({entryDeleted: result.entryDeleted, variantsUpdates: result.variantsUpdates})
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}
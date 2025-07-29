import prisma from "../db.js"

export const createStockEntry = async(req, res) => {
    const newStockEntry = await prisma.stockEntry.create({
        data: {
            userId: req.body.userId,
            items: {
                create: req.body.items.map((item)=> ({
                    quantity: item.quantity,
                    variantId: item.variantId
                }))
            }
        },
        include: {
            items: true
        }
    })

    const variantsUpdates = {}
    for (const item of newStockEntry.items){
        const variantWithStockUpdated = await prisma.productVariant.update({
            where: {
                id: item.variantId
            },
            data: {
                stock: {
                    increment: item.quantity
                }
            }
        })
        variantsUpdates[variantWithStockUpdated.code] = variantWithStockUpdated
    }
    
    return res.json({
        stockEntry: newStockEntry,
        updatedVariants: variantsUpdates
    })
}

export const getAllStockEntries = async(req, res) => {
    const allStockEntries = await prisma.stockEntry.findMany({
        include: {
            items: true
        }
    })
    return res.json(allStockEntries)
}

export const deleteEntry = async(req, res) =>{
    const idSelected = req.params.id
    const entryDeleted = await prisma.stockEntry.delete({
        where: {
            id: idSelected
        }
    })
    return res.json(entryDeleted)
}
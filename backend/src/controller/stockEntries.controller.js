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
    return res.json(newStockEntry)
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
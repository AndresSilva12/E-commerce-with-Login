import prisma from "../db.js"

export const createStockEntry = async(req, res) => {
    try {
        const result = await prisma.$transaction(async(tx) => {
            const newStockEntry = await tx.stockEntry.create({
                data: {
                    userId: req.body.userId,
                    items: {
                        create: req.body.items.map((item)=> ({
                            quantity: item.quantity,
                            variantId: item.variantId,
                            purchasePrice: item.purchasePrice
                        }))
                    },
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
            }
        }
        })
        return res.json(allStockEntries)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error interno durante el proceso" });
    }
}

export const deleteEntry = async(req, res) =>{
    try {
        const result = await prisma.$transaction( async(tx) => {
            const idSelected = req.params.id
            const entryExist = await tx.stockEntry.findFirst({where: {id: idSelected}, include: {items: true}})
            if (!entryExist) {throw new Error(`Entrada no existente: ${idSelected}`)}

            const variantsThatNotExist = {}
            const variantsWithLowStock = {}
            for (const item of entryExist.items){
                const variantExist = await tx.productVariant.findFirst({where: {id: item.variantId}})
                if (!variantExist){
                    variantsThatNotExist[item.variantId] = `Variante inexistente: ${item.variantId}`
                    continue
                }
                if (variantExist.stock < item.quantity){
                    variantsWithLowStock[item.variantId] = `Error, stock de ${variantExist.code} por debajo de la cantidad ${item.quantity}`
                }
            }
            if (Object.keys(variantsThatNotExist).length > 0) throw new Error(JSON.stringify(variantsThatNotExist))
            if (Object.keys(variantsWithLowStock).length > 0) throw new Error(JSON.stringify(variantsWithLowStock))

            const entryDeleted = await tx.stockEntry.delete({
                where: {
                    id: idSelected
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
        console.log(error);
        return res.status(500).json({ error: "Error interno durante el proceso" });
    }
}
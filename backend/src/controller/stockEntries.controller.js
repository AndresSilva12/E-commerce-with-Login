import prisma from "../db.js"

export const createStockEntry = async(req, res) => {
    try {
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
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error interno durante el proceso" });
    }
}

export const getAllStockEntries = async(req, res) => {
    try {
        const allStockEntries = await prisma.stockEntry.findMany({
        include: {
            items: true
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
        const idSelected = req.params.id
        const entryDeleted = await prisma.stockEntry.delete({
            where: {
                id: idSelected
            }
        })
        return res.json(entryDeleted)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error interno durante el proceso" });
    }
}
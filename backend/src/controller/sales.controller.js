import prisma from "../db.js"
export const createNewSale = async(req, res) => {
    try {
        const newSale = await prisma.sales.create({
            data: {
                totalPrice: req.body.totalPrice,
                userId: req.body.userId,
                items: {
                    create: req.body.items.map((item)=> ({
                        variantId: item.variantId,
                        quantity: item.quantity
                    }))
                }
            },
            include: {
                items: true
            }
        })
        const variantsUpdates = {}
        for (const item of newSale.items){
            const variantWithStockUpdated = await prisma.productVariant.update({
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
        return res.json({
            sale: newSale,
            updatedVariants: variantsUpdates
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error interno durante el proceso" });
    }
}

export const getAllSales = async(req, res) => {
    try {
        const allSales = await prisma.sales.findMany({
            include: {
                items: true
            }
        })
        return res.json(allSales)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error interno durante el proceso" });
    }
}

export const deleteSale = async(req, res) => {
    try {
        const idSelected = req.params.id
        const saleDeleted = await prisma.sales.delete({
            where: {
                id: idSelected
            }
        })
        return res.json(saleDeleted)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error interno durante el proceso" });
    }
}
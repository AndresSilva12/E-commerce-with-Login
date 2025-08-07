import { id } from "zod/v4/locales"
import prisma from "../db.js"
export const createNewSale = async(req, res) => {
    try {
        const result = await prisma.$transaction(async (tx) => {
            const newSale = await tx.sales.create({
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
                }
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
        const result = await prisma.$transaction( async(tx) => {
            const idSelected = req.params.id
            const saleExist = await tx.sales.findFirst({where: {id: idSelected}, include: {items: true}})
            if (!saleExist) throw new Error(`Venta inexistente: ${idSelected}`)

            const variantsThatNotExist = {}
            for (const item of saleExist.items){
                const variantExist = await tx.productVariant.findFirst({where: {id: item.variantId}})
                if (!variantExist) {
                    variantsThatNotExist[item.variantId] = `variante inexistente: ${item.variantId}`
                    continue
                }
            }
            if (Object.keys(variantsThatNotExist).length > 0) throw new Error(JSON.stringify(variantsThatNotExist))

            const saleDeleted = await tx.sales.delete({
                where: {
                    id: idSelected
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
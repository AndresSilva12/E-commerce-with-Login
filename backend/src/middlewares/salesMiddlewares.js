import prisma from "../db.js";
import { saleSchema } from "../../../validation/salesSchema.js";

export const validateNewSale = async(req, res, next) => {
    try {
        const saleParsed = saleSchema.safeParse(req.body)
        const errors = {}
        if (!saleParsed.success) {
            for (const error of saleParsed.error.errors){
                errors[error.path] = error.message
            }
            return res.status(400).json({errors})
        }

        const {items} = saleParsed.data
        const userExist = await prisma.users.findFirst({where: {id: req.user.id}})
        if (!userExist) errors.userId = "Usuario inexistente"

        const errorsItem = {}
        let total = 0
        const variantsNotDuplicate = []
        for (const item of items) {
            const variantExist = await prisma.productVariant.findFirst({
                where:{
                    id: item.variantId
                },
                include: {
                    product: true,
                    stockEntryItem: true
                }})
            if (!variantExist) {
                errorsItem[item.variantId] = `Variante inexistente: ${item.variantId}`;
                continue
            }
            if (item.quantity > variantExist.stock) {
                errorsItem[item.variantId] = `Stock insuficiente: disponible ${variantExist.stock}`
                continue
            }

            const promedioPonderado = (variantExist.stockEntryItem.reduce((acc, cur) => acc + (cur.quantity * cur.purchasePrice ), 0))
                / variantExist.stockEntryItem.reduce((acc, cur) => acc + cur.quantity, 0)
            const found = variantsNotDuplicate.find((element) => element.variantId === item.variantId)
            if (found){
                found.quantity += item.quantity
            }else {
                variantsNotDuplicate.push({
                    ...item,
                    purchasePrice: promedioPonderado
                });
            }         

            total += item.quantity * variantExist.product.salePrice
        }
        if (Object.keys(errorsItem).length > 0) errors.items = errorsItem
        if (Object.keys(errors).length > 0) return res.status(400).json({errors})

        req.body = saleParsed.data
        req.body.items = variantsNotDuplicate
        req.body.totalPrice = total
        next()
    } catch (error) {
        return res.status(500).json({ error: "Error interno durante el proceso" });
    }
}

export const validateSaleExist = async (req, res, next) => {
    try {
        const id = req.params.id
        const saleExist = await prisma.sales.findFirst({where: id})
        if (!saleExist) return res.json({error: "El id no corresponde a ninguna venta"})
        req.sale = saleExist
        next()
    } catch (error) {
        res.status(500).json({ error: "Error interno durante el proceso" });
    }
}
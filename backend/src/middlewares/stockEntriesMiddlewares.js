import { stockEntriesSchema } from "../../../validation/stockEntriesSchema.js";
import prisma from "../db.js";

export const validateStockEntry = async(req, res, next) => {
    try {
        const stockEntryParsed = stockEntriesSchema.safeParse(req.body)
        const errors = {}
        if (!stockEntryParsed.success){
            for (const error of stockEntryParsed.error.errors){
                errors[error.path] = error.message
            }
            return res.status(400).json({errors})
        }

        const {items} = stockEntryParsed.data

        const userExist = await prisma.users.findFirst({where: {id: req.user.id}})
        if (!userExist) errors.userId = "Usuario inexistente"
    
        const errorsItem = {}
        let total = 0
        const variantsNotDuplicate = []
        for (const item of items) {
            const found = variantsNotDuplicate.find((element) => element.variantId === item.variantId)
            if (found){
                found.quantity += item.quantity
            }else {
                variantsNotDuplicate.push({...item});
            }    

            const variantExist = await prisma.productVariant.findFirst({where: {id: item.variantId}, include: {product: true}})
            if (!variantExist) {
                errorsItem[item.variantId] = `Variante inexistente: ${item.variantId}`
                continue
            }
            total += item.quantity * item.purchasePrice
        }

        if (Object.keys(errorsItem).length > 0) errors.items = errorsItem
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({errors})
        }
        req.body = stockEntryParsed.data
        req.body.items = variantsNotDuplicate
        req.body.total = total
        next()
    } catch (error) {
        return res.status(500).json({ error: "Error interno durante el proceso" });
    }
}

export const validateStockEntryExist = async(req, res, next) => {
    try {
        const id = req.params.id
        const stockEntryExist = await prisma.stockEntry.findFirst({
            where: {id: id},
            include: {items: true}
        })
        if (!stockEntryExist) return res.json({error: "El Id no corresponde a ninguna entrada"})
        req.stockEntry = stockEntryExist
        next()
    } catch (error) {
        return res.status(500).json({ error: "Error interno durante el proceso" });
    }
}
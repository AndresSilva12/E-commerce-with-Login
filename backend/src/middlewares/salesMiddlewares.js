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

        const {userId, items} = saleParsed.data
        const userExist = await prisma.users.findFirst({where: {id: userId}})
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

            const variantExist = await prisma.productVariant.findFirst({where:{id: item.variantId}, include: {product: true}})
            if (!variantExist) {
                errorsItem[item.variantId] = `Variante inexistente: ${item.variantId}`;
                continue
            }
            if (item.quantity > variantExist.stock) {
                errorsItem[item.variantId] = `Stock insuficiente: disponible ${variantExist.stock}`
                continue
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
        console.log(error);
        return res.status(500).json({ error: "Error interno durante el proceso" });
    }
}


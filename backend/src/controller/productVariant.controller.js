import prisma from '../db.js'

export const createVariant = async(req, res) => {
    try{
        const newVariant = await prisma.productVariant.create({
            data: req.body
        })
        return res.json(newVariant)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error: "Error interno durante el proceso"})
    }
}

export const getAllVariants = async(req, res) => {
    try {
        const variants = await prisma.productVariant.findMany()
        return res.json(variants)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error interno durante el proceso"})
    }
}

export const deleteVariant = async(req, res) => {
    try {
        const idParsed = req.params.id
        const variantDeleted = await prisma.productVariant.delete({
            where: {
                id: idParsed
            }
        })
        return res.json(variantDeleted)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error interno durante el proceso"})
    }
}

export const deleteAllVariantsByProduct = async(req, res) => {
    try {
        const productIdParsed = req.params.productId
        const variantsDeleted = await prisma.productVariant.deleteMany({
            where: {
                productId: productIdParsed
            }
        })
        return res.json({variantsDeleted})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error interno durante el proceso"})
    }
}


export const updateVariant = async(req, res) => {
    try {
        const idParsed = req.params.id
        const variantUpdated = await prisma.productVariant.update({
            where: {
                id: idParsed
            },
            data: req.body
        })
        return res.json(variantUpdated)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error interno durante el proceso"})
    }
}

export const getAllVariantsByProduct = async(req, res) => {
    try {
        const productIdParsed = req.params.productId
        const variants = await prisma.productVariant.findMany({
            where: {
                productId: productIdParsed
            }
        })
        return res.json(variants)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error interno durante el proceso"})
    }
}

export const getOnlyOneVariant = async(req, res) => {
    try {
        const idParsed = req.params.id
        const variant = await prisma.productVariant.findUnique({
            where: {
                id: idParsed
            }
        })
        return res.json(variant)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error interno durante el proceso"})
    }
}
import prisma from '../db.js'

export const createProductVariant = async(req, res) => {
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
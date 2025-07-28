import prisma from "../db.js"
export const createNewSale = async(req, res) => {
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
    return res.json(newSale)
}

export const getAllSales = async(req, res) => {
    const allSales = await prisma.sales.findMany({
        include: {
            items: true
        }
    })
    return res.json(allSales)
}

export const deleteSale = async(req, res) => {
    const idSelected = req.params.id
    const saleDeleted = await prisma.sales.delete({
        where: {
            id: idSelected
        }
    })
    return res.json(saleDeleted)
}
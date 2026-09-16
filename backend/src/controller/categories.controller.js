import prisma from '../db.js'

export const getAllCategories = async(req, res) => {
    try{
        const categories = await prisma.category.findMany({
            orderBy: [
                {
                    name: 'asc'
                }
            ]
        })
        return res.status(200).json(categories)
    }catch (error) {
        console.log(error)
    }
}

export const createCategory = async(req, res) => {
    try {
        const newCategory = await prisma.category.create({
            data: {
                name: req.body.name
            }
        })
        return res.status(200).json(newCategory)
    } catch (error) {
        console.log(error)
    }
}

export const getUniqueCategory = async(req, res) => {
    try {
        const {id} = req.params
        const uniqueCategory = await prisma.category.findUnique({
            where:{
                id: id
            }
        })
        return res.status(200).json(uniqueCategory)
    } catch (error) {
        console.log(error)
    }
}

export const updateCategory = async(req, res) => {
    try {
        const categoryUpdated = await prisma.category.update({
            where: {
                id: req.category.id
            },
            data: {
                name: req.body.name
            }
        })
        return res.status(200).json(categoryUpdated)
    } catch (error) {
        return res.status(500).json({error: "Error interno del servidor"})
    }
}
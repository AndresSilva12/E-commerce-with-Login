import prisma from '../db.js'

export const getAllCategories = async(req, res) => {
    try{
        const categories = await prisma.category.findMany()
        return res.json(categories)
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
        return res.json(newCategory)
    } catch (error) {
        console.log(error)
    }
}

export const getUniqueCategory = async(req, res) => {
    try {
        const {id} = req.params
        const uniqueCategory = await prisma.category.findFirst({
            where:{
                id: id
            }
        })
        return res.json(uniqueCategory)
    } catch (error) {
        console.log(error)
    }
}
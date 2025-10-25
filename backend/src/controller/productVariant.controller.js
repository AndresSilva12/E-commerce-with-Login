import path from "path";
import fs from "fs";
import prisma from '../db.js'

export const createVariant = async(req, res) => {
    try{
        const newVariant = await prisma.productVariant.create({
            data: {
                code: req.body.code,
                size:req.body.size,
                color:req.body.color,
                stock: 0,
                image:req.body.image,
                productId:req.body.productId
            }
        })
        return res.json(newVariant)
    }
    catch(error){
        return res.status(500).json({error: "Error interno durante el proceso"})
    }
}

export const getVariants = async(req, res) => {
    try {
        const LIMIT = 10
        const page = Number(req.query.page) || 1
        const skip = (page -1) * LIMIT
        const take = LIMIT
        const {code, size, color, stockMin, stockMax, sortBy, sortOrder} = req.query
        const where = {}
        const onlyDisabled = req.query.onlyDisabled === "true";

        where.disabled = { equals: onlyDisabled ? true : false }
        
        if (code) where.code = {equals: code}
        if (size) where.size = {equals: size}
        if (color) where.color = {equals: color}
        if (stockMin || stockMax) {
            where.stock = {}
            if (stockMin) where.stock.gte = parseInt(stockMin)
            if (stockMax) where.stock.lte = parseInt(stockMax)
        }

        if (req.query.name || req.query.brand || req.query.priceMin || req.query.priceMax || req.query.category){
            where.product = {}
            if (req.query.name) where.product.name ={contains: req.query.name}
            if (req.query.brand) where.product.brand = {equals: req.query.brand}
            if (req.query.category) where.product.category = {name: {equals: req.query.category}}
            if (req.query.priceMin || req.query.priceMax){
                where.product.salePrice = {}
                if (req.query.priceMin) where.product.salePrice.gte = parseFloat(req.query.priceMin)
                if (req.query.priceMax) where.product.salePrice.lte = parseFloat(req.query.priceMax)
            }
        }
        
        const totalCount = await prisma.productVariant.count({where})

        const variants = await prisma.productVariant.findMany({
            include: {
                product: {
                    include: {
                        category: true
                    }
                },
            },
            where,
            take,
            skip,
            orderBy: sortBy 
                ? sortBy === 'name' || sortBy === 'brand' || sortBy === 'price'
                    ? { product : { [sortBy === 'price' ? 'salePrice' : sortBy]: sortOrder === 'desc' ? 'desc' : 'asc'}}
                    : {[sortBy]: sortOrder === 'desc' ? 'desc' : 'asc'} 
                : undefined
        })

        const totalPages = Math.ceil(totalCount / LIMIT)

        const sizes = [...new Set(variants.map(v => v.size))]
        const colors = [...new Set(variants.map(v => v.color))]
        const brands = [...new Set(variants.map(v => v.product.brand))]
        const categories = [...new Set(variants.map(v => v.product.category.name))]
        return res.json({
            variants: variants,
            filters:{
                sizes: sizes,
                colors: colors,
                brands: brands,
                categories: categories
            },
            pagination: {
                totalPages: totalPages,
                totalCount: totalCount,
                page: page,
                limit: LIMIT
            }
        })
    } catch (error) {
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
        const urlSplit = variantDeleted.image.split('/uploads/')[1]
        const imageRute= path.join(process.cwd(), 'uploads', urlSplit)
        await fs.promises.unlink(imageRute)
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
            data: req.body,
            include: {
                product: {
                    include: {
                        category: true
                    }
                }
            }
        })
        return res.json(variantUpdated)
    } catch (error) {
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
        return res.status(500).json({error: "Error interno durante el proceso"})
    }
}

export const disableVariant = async(req, res) => {
    try {
        const variant = await prisma.productVariant.update({
            where: {
                id: req.params.id
            },
            data: {
                disabled: true
            }
        })
        return res.json(variant)
    } catch (error) {
        return res.status(500).json({error: "Error interno durante el proceso"})
    }
}

export const enableVariant = async(req, res) => {
    try {
        const variant = await prisma.productVariant.update({
            where: {
                id: req.params.id
            },
            data: {
                disabled: false
            }
        })
        return res.json(variant)
    } catch (error) {
        return res.status(500).json({error: "Error interno durante el proceso"})
    }
}
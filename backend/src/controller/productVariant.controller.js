import path from "path";
import fs from "fs";
import prisma from '../db.js'
import { equal } from "assert";

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
        console.log("nueva variante",newVariant)
        return res.json(newVariant)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error: "Error interno durante el proceso"})
    }
}

export const getVariants = async(req, res) => {
    try {
        const {code, size, color, stockMin, stockMax, sortBy, sortOrder} = req.query
        const where = {}

        if (code) where.code = {equals: code}
        if (size) where.size = {equals: size}
        if (color) where.color = {equals: color}
        if (stockMin || stockMax) {
            where.stock = {}
            if (stockMin) where.stock.gte = parseInt(stockMin)
            if (stockMax) where.stock.lte = parseInt(stockMax)
        }

        if (req.query.name || req.query.brand || req.query.priceMin || req.query.priceMax){
            where.product = {}
            if (req.query.name) where.product.name ={contains: req.query.name}
            if (req.query.brand) where.product.brand = {equals: req.query.brand}
            if (req.query.priceMin || req.query.priceMax){
                where.product.salePrice = {}
                if (req.query.priceMin) where.product.salePrice.gte = parseFloat(req.query.priceMin)
                if (req.query.priceMax) where.product.salePrice.lte = parseFloat(req.query.priceMax)
            }
        }
        const variants = await prisma.productVariant.findMany({
            include: {
                product: true,
            },
            where,
            orderBy: sortBy ? {[sortBy]: sortOrder === 'desc' ? 'desc' : 'asc'} : undefined
        })
        const sizes = [...new Set(variants.map(v => v.size))]
        const colors = [...new Set(variants.map(v => v.color))]
        const brands = [...new Set(variants.map(v => v.product.brand))]
        return res.json({
            variants: variants,
            filters:{
                sizes: sizes,
                colors: colors,
                brands: brands
            }
        })
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
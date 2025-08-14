import prisma from "../db.js";

export const createProduct = async (req, res) => {
  try {
    const {
      code,
      name,
      description,
      salePrice,
      brand,
      variants,
    } = req.body;
    const newProduct = await prisma.products.create({
      data: {
        code: code,
        name: name,
        description: description,
        salePrice: salePrice,
        brand: brand,
        ...(variants &&
          variants.length > 0 && {
            variants: {
              create: variants.map( v => ({
                ...v,
                stock: 0
              }))
            },
          }),
      },
      include: {
        variants: true,
      },
    });
    return res.json(newProduct);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error interno al crear el producto" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const {name, brand, priceMin, priceMax} = req.query
    const where = {}
    if (name){
      where.name = {contains: name}
    }
    if (brand){
      where.brand = {equals: brand}
    }
    if (priceMin || priceMax){
      where.salePrice = {}
      if (priceMin) where.salePrice.gte = parseFloat(priceMin)
      if (priceMax) where.salePrice.lte = parseFloat(priceMax)
    }

    if (req.query.variantColor || req.query.variantSize){
      where.variants = {
        some: {}
      }

      if (req.query.variantColor){
        where.variants.some.color = {contains: req.query.variantColor}
      }

      if (req.query.variantSize){
        where.variants.some.size = {equals: req.query.variantSize}
      }
    }

    const products = await prisma.products.findMany({
      include: {
        variants: true,
      },
      where,
    });
    return res.json(products);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error interno al traer los productos" });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await prisma.products.findUnique({
      where: {
        id: id,
      },
    });
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error interno al traer el producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productDeleted = await prisma.products.delete({
      where: {
        id: id,
      },
    });
    return res.json(productDeleted);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error interno al eliminar el producto" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      code,
      name,
      description,
      salePrice,
      brand,
      variants,
    } = req.body;
    const updateVariants = variants.filter((variant) => variant.id);
    const newVariants = variants.filter((variant) => !variant.id);

    for (const variant of updateVariants) {
      await prisma.productVariant.update({
        where: {
          id: variant.id,
        },
        data: {
          code: variant.code,
          size: variant.size,
          color: variant.color,
          stock: variant.stock,
          image: variant.image,
        },
      });
    }

    const productUpdated = await prisma.products.update({
      where: {
        id: id,
      },
      data: {
        code: code,
        name: name,
        description: description,
        salePrice: salePrice,
        brand: brand,
        ...(newVariants &&
          newVariants.length > 0 && {
            variants: {
              create: newVariants,
            },
          }),
      },
      include: {
        variants: true,
      },
    });
    return res.json(productUpdated);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error interno al actualizar el producto" });
  }
};

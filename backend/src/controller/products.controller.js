import prisma from "../db.js";

export const createProduct = async (req, res) => {
  try {
    const {
      code,
      name,
      description,
      purchasePrice,
      salePrice,
      brand,
      variants,
    } = req.body;
    const newProduct = await prisma.products.create({
      data: {
        code: code,
        name: name,
        description: description,
        purchasePrice: purchasePrice,
        salePrice: salePrice,
        brand: brand,
        ...(variants &&
          variants.length > 0 && {
            variants: {
              create: variants,
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

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.products.findMany({
      include: {
        variants: true,
      },
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
      purchasePrice,
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
        purchasePrice: purchasePrice,
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

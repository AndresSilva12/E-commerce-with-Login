import path from "path";
import fs from "fs";

export const uploadNewImage = (req, res) => {
  try {
    const PORT = process.env.PORT || 3000;
    const file = req.file;
    if (!file.mimetype.startsWith("image/")) {
      return res.status(400).json({ error: "Formato de archivo no permitido" });
    }
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".jfif", ".webp"];
    const extension = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      return res.status(400).json({ error: "Formato de imagen no permitido" });
    }

    const newFileName = file.filename + extension;

    const oldPath = path.join(file.destination, file.filename);
    const newPath = path.join(file.destination, newFileName);

    fs.renameSync(oldPath, newPath);
    const imageUrl = `http://localhost:${PORT}/uploads/${newFileName}`;
    res.json({ url: imageUrl });
  } catch (error) {
    console.log("Error en el uploadImage", error);
  }
};

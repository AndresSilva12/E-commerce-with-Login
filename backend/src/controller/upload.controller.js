import path from "path";
import fs from "fs";

export const uploadNewImage = (req, res) => {
  const PORT = process.env.PORT || 3000;
  const file = req.file;
  const extension = path.extname(file.originalname);
  const newFileName = file.filename + extension;

  const oldPath = path.join(file.destination, file.filename);
  const newPath = path.join(file.destination, newFileName);

  fs.renameSync(oldPath, newPath);
  const imageUrl = `http://localhost:${PORT}/uploads/${newFileName}`;
  res.json({ url: imageUrl });
};

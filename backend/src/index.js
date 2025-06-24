import express from "express";
import multer from "multer";
import user from "./routes/user.route.js";
import product from "./routes/product.route.js";
import variants from "./routes/productVariants.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const upload = multer({ dest: "uploads/" });

const App = express();

App.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

App.use(express.json());

App.use(cookieParser());

App.post("/api/upload", upload.single("image"), (req, res) => {
  const file = req.file;
  const extension = path.extname(file.originalname);
  const newFileName = file.filename + extension;

  const oldPath = path.join(file.destination, file.filename);
  const newPath = path.join(file.destination, newFileName);

  fs.renameSync(oldPath, newPath);

  const imageUrl = `http://localhost:3000/uploads/${newFileName}`;
  res.json({ url: imageUrl });
});

App.use("/uploads", express.static(path.join(_dirname, "..", "uploads")));

App.use("/api", user);

App.use("/api", product);

App.use("/api", variants);

App.listen(3000, () => {
  console.log('Servidor Iniciado en "http://localhost:3000" ...');
});

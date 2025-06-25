import multer from "multer";
import { Router } from "express";
import { uploadNewImage } from "../controller/upload.controller.js";

const route = Router();
const upload = multer({ dest: "uploads/" });

route.post("/upload", upload.single("image"), uploadNewImage);

export default route;

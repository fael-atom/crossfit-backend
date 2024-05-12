import express from "express";
import path from "path";
import ProductController from "../controllers/ProductController.js";
import multer from "multer";
import {
  validateProduct,
  validateProductUpdate,
} from "../middlewares/validations.js";

const productRouter = express.Router();
const productController = new ProductController();
const storage = multer.diskStorage({
  destination: "./public/images",
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // Obtenha a extensão do arquivo original
    cb(null, file.originalname + "-" + Date.now() + ext); // Adicione a extensão ao nome de destino
  },
});
const picture = multer({ storage: storage });

productRouter.get(
  "/",
  async (req, res) => await productController.getProducts(req, res)
);

productRouter.get(
  "/:id",
  async (req, res) => await productController.getProductById(req, res)
);

productRouter.post(
  "/",
  // validateProductUpdate,
  picture.single("picture"),
  async (req, res) => await productController.createProduct(req, res)
);

productRouter.patch(
  "/:id",
  validateProductUpdate,
  async (req, res) => await productController.updateProduct(req, res)
);

productRouter.delete(
  "/:id",
  async (req, res) => await productController.deleteProduct(req, res)
);

export default productRouter;

import express from "express";
import ProductController from "../controllers/ProductController.js";
import {
  validateProduct,
  validateProductUpdate,
} from "../middlewares/validations.js";

const productRouter = express.Router();
const productController = new ProductController();

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
  validateProductUpdate,
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

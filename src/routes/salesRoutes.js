import express from "express";
import SalesController from "../controllers/SalesController.js";
import {
  validateSale,
  validateSaleUpdate,
} from "../middlewares/validations.js";

const salesRouter = express.Router();
const salesController = new SalesController();

salesRouter.get(
  "/",
  async (req, res) => await salesController.getSales(req, res)
);

salesRouter.get(
  "/:id",
  async (req, res) => await salesController.getSaleByUserId(req, res)
);

salesRouter.post(
  "/",
  validateSale,
  async (req, res) => await salesController.createSale(req, res)
);

salesRouter.patch(
  "/:id",
  validateSaleUpdate,
  async (req, res) => await salesController.updateSale(req, res)
);

salesRouter.delete(
  "/:id",
  async (req, res) => await salesController.deleteSale(req, res)
);

export default salesRouter;

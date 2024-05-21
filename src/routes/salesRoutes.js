import express from "express";
import SalesController from "../controllers/SalesController.js";
import {
  validateSale,
  validateSaleUpdate,
} from "../middlewares/validations.js";

const salesRouter = express.Router();
const salesController = new SalesController();

salesRouter.get("/", async (req, res) => {
  const { userId, isPaid, month, year, countAll } = req.query;


  if (isPaid && userId) {
    return await salesController.getUserSalesByNotPaid(req, res);
  }

  if (countAll === "true") {
    return await salesController.getSalesQuantity(req, res);
  }
  
  if (month && year) {
    return await salesController.getSalesByMonthYear(req, res);
  } else {
    return await salesController.getSales(req, res);
  }
});

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

salesRouter.put(
  "/:id/mark-as-paid",
  async (req, res) => await salesController.payAllSales(req, res)
);

salesRouter.delete(
  "/:id",
  async (req, res) => await salesController.deleteSale(req, res)
);

export default salesRouter;

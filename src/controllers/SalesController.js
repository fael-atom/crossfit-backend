import { SalesService } from "../services/SalesService.js";
import {
  salesSchema,
  salesUpdateSchema,
} from "../models/schemas/salesSchema.js";

class SalesController {
  constructor() {
    this.SalesService = new SalesService();
  }

  async getSales(req, res) {
    try {
      const sales = await this.SalesService.getSales();
      return res.json(sales);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getSaleByUserId(req, res) {
    try {
      const id = parseInt(req.params.id);
      const sales = await this.SalesService.getSaleByUserId(id);
      return res.json(sales);
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: "Vendas não encontradas." });
    }
  }

  async createSale(req, res) {
    try {
      const saleData = salesSchema.parse(req.body);
      const sale = await this.SalesService.createSale(saleData);
      res.status(201).json(sale);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateSale(req, res) {
    try {
      const id = parseInt(req.params.id);
      const saleData = salesUpdateSchema.parse(req.body);
      const sale = await this.SalesService.updateSale(id, saleData);
      res.status(200).json(sale);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteSale(req, res) {
    try {
      const id = parseInt(req.params.id);
      const sale = await this.SalesService.deleteSale(id);
      return res.json(sale);
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: "Sale not found" });
    }
  }
}

export default SalesController;

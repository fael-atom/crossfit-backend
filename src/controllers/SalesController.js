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

  async getSalesQuantity(req, res) {
    try {
      const sales = await this.SalesService.getSalesQuantity();
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

  async getUserSalesByNotPaid(req, res) {
    try {
      const { user, isPaid } = req.query;
      const Users = await this.SalesService.getUserSalesByNotPaid(user, isPaid);
      return res.json(Users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getSalesByMonthYear(req, res) {
    try {
      const { month, year } = req.query;
      const sales = await this.SalesService.getSalesByMonthYear(month, year);
      return res.json(sales);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
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

  async payAllSales(req, res) {
    try {
      const id = parseInt(req.params.id);
      const userSales = await this.SalesService.payAllSaleByUserId(id, req.body);
      return res.json(userSales);
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: "Sales not updated" });
    }
  }
}

export default SalesController;

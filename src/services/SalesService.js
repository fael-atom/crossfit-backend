import Sales from "../models/Sales.js";
import { prisma } from "../libs/prisma.js";

export class SalesService {
  async getSales() {
    const sales = await prisma.sale.findMany();
    return sales.map((salesData) => {
      const salesInstance = new Sales(salesData);
      return salesInstance.getSales();
    });
  }

  async getSalesById(id) {
    const salesData = await prisma.sale.findUnique({ where: { id: id } });
    const salesInstance = new Sales(salesData);
    return salesInstance.getSales();
  }

  async createSales(data) {
    const salesData = await prisma.sale.create({ data });
    const salesInstance = new Sales(salesData);
    return salesInstance.getSales();
  }

  async updateSales(id, data) {
    const salesDataUpdated = await prisma.sale.update({
      where: { id: id },
      data,
    });
    const salesInstance = new Sales(salesDataUpdated);
    return salesInstance.getSales();
  }

  async deleteSales(id) {
    const salesData = await prisma.sale.delete({ where: { id: id } });
    const salesInstance = new Sales(salesData);
    return salesInstance;
  }
}

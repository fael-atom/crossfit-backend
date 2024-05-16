import { Sales } from "../models/Sales.js";
import { prisma } from "../libs/prisma.js";

export class SalesService {
  async getSales() {
    const sales = await prisma.sale.findMany();
    return sales.map((salesData) => {
      const salesInstance = new Sales(salesData);
      return salesInstance.getSales();
    });
  }

  async getSaleByUserId(id) {
    const salesData = await prisma.sale.findMany({
      where: {
        userId: id,
      },
    });
    // const salesInstance = new Sales(salesData);
    // return salesInstance.getSales();
    return salesData;
  }

  async createSale(data) {
    const salesData = await prisma.sale.create({ data });
    const salesInstance = new Sales(salesData);
    return salesInstance.getSales();
  }

  async updateSale(id, data) {
    const salesDataUpdated = await prisma.sale.update({
      where: { id: id },
      data,
    });
    const salesInstance = new Sales(salesDataUpdated);
    return salesInstance.getSales();
  }

  async deleteSale(id) {
    const salesData = await prisma.sale.delete({ where: { id: id } });
    const salesInstance = new Sales(salesData);
    return salesInstance;
  }
}

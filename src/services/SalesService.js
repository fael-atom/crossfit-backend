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

  async getSalesQuantity(year) {
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31T23:59:59.999Z`);
    const totalSales = await prisma.sale.count();
    const paidSales = await prisma.sale.count({
      where: {
        isPaid: true,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    const unPaidSales = await prisma.sale.count({
      where: {
        isPaid: false,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    return { totalSales, paidSales, unPaidSales };
  }

  async getUserSalesByNotPaid(userId, isPaid) {
    const sales = await prisma.sale.findMany({
      where: {
        isPaid: {
          equals: isPaid === "true" ? true : false,
        },
        userId: {
          equals: Number(userId),
        },
      },
    });
    return sales.map((sale) => {
      const salesInstance = new Sales(sale);
      return salesInstance.getSales();
    });
  }

  async getSalesByMonthYear(month, year) {
    const sales = await prisma.sale.findMany({
      where: {
        createdAt: {
          gte: new Date(`${year}-${month}-01`),
          lt: new Date(`${year}-${Number(month) + 1}-01`),
        },
      },
    });
    return sales.map((sale) => {
      const salesInstance = new Sales(sale);
      return salesInstance.getSales();
    });
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

  async payAllSaleByUserId(id, data) {
    const salesDataUpdated = await prisma.sale.updateMany({
      where: { userId: id },
      data: { isPaid: true },
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

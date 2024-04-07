import { Product } from "../models/Product.js";
import { prisma } from "../libs/prisma.js";

export class ProductService {
  async getProducts() {
    const products = await prisma.product.findMany();
    return products.map((productData) => {
      const productInstance = new Product(productData);
      return productInstance.getProduct();
    });
  }

  async getProductById(id) {
    const productData = await prisma.product.findUnique({ where: { id: id } });
    const productInstance = new Product(productData);
    return productInstance.getProduct();
  }

  async createProduct(data) {
    const productData = await prisma.product.create({ data });
    const productInstance = new Product(productData);
    return productInstance.getProduct();
  }

  async updateProduct(id, data) {
    const productDataUpdated = await prisma.product.update({
      where: { id: id },
      data,
    });
    const productInstance = new Product(productDataUpdated);
    return productInstance.getProduct();
  }

  async deleteProduct(id) {
    const productData = await prisma.product.delete({ where: { id: id } });
    const productInstance = new Product(productData);
    return productInstance;
  }
}

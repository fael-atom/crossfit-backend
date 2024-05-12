import { Product } from "../models/Product.js";
import { prisma } from "../libs/prisma.js";
import { v4 as uuidv4, v4 } from "uuid";
import fs from "fs";

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

  async createProduct(data, file) {
    try {
      data.unitPrice = parseFloat(data.unitPrice);
      data.stockQuantity = parseInt(data.stockQuantity);
      console.log(file);
      const productDataWithImage = { ...data, picture: `https://crossfit-backend.onrender.com/static/images/${file.filename}`};
      const productData = await prisma.product.create({
        data: productDataWithImage,
      });
      const productInstance = new Product(productData);
      return productInstance.getProduct();
    } catch (error) {
      throw new Error("Erro ao criar o produto: " + error.message);
    }
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

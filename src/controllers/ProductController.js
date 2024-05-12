import { ProductService } from "../services/ProductService.js";
import {
  productSchema,
  productCreateSchema,
  productUpdateSchema,
} from "../models/schemas/productSchema.js";

class ProductController {
  constructor() {
    this.ProductService = new ProductService();
  }

  async getProducts(req, res) {
    try {
      const products = await this.ProductService.getProducts();
      return res.json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getProductById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const product = await this.ProductService.getProductById(id);
      return res.json(product);
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: "Product not found" });
    }
  }

  async createProduct(req, res) {
    try {
      const productData = req.body;
      const file = req.file;
      const imageUrl = `/images/${file.filename}`;
      productData.picture = imageUrl;
      const createdProduct = await this.ProductService.createProduct(
        productData,
        file
      );
      res.status(201).json(createdProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const id = parseInt(req.params.id);
      const productData = productUpdateSchema.parse(req.body);
      const product = await this.ProductService.updateProduct(id, productData);
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const id = parseInt(req.params.id);
      const product = await this.ProductService.deleteProduct(id);
      return res.json(product);
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: "Product not found" });
    }
  }
}

export default ProductController;

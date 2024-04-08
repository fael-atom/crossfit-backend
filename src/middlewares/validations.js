import { userSchema, userUpdateSchema } from "../models/schemas/userSchema.js";
import { productSchema, productUpdateSchema } from "../models/schemas/productSchema.js";
import { salesSchema, salesUpdateSchema } from "../models/schemas/salesSchema.js";

//********** Validations for Users ***********//

export const validateUser = (req, res, next) => {
  const newUser = req.body;
  try {
    userSchema.parse(newUser);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

export const validateUserUpdate = (req, res, next) => {
  const userData = req.body;
  try {
    userUpdateSchema.parse(userData);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

//********** Validations for Products ***********//

export const validateProduct = (req, res, next) => {
  const newProduct = req.body;
  try {
    productSchema.parse(newProduct);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

export const validateProductUpdate = (req, res, next) => {
  const productData = req.body;
  try {
    productUpdateSchema.parse(productData);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

//********** Validations for Sales ***********//

export const validateSale = (req, res, next) => {
  const newSale = req.body;
  try {
    salesSchema.parse(newSale);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

export const validateSaleUpdate = (req, res, next) => {
  const saleData = req.body;
  try {
    salesUpdateSchema.parse(saleData);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

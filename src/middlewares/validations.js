import { userSchema, userUpdateSchema } from "../models/schemas/userSchema.js";

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

import { clientSchema, clientUpdateSchema } from "../models/clientModel.js"

export const validateClient = (req, res, next) => {
  const newClient = req.body;
  try {
    clientSchema.parse(newClient);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

export const validateClientUpdate = (req, res, next) => {
  const clientData = req.body;
  try {
    clientUpdateSchema.parse(clientData);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};



import { clientSchema, clientUpdateSchema } from " ../models/clientModel.js"

const validateClient = (req, res, next) => {
  const newClient = req.body;
  try {
    clientSchema.parse(newClient);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

const validateClientUpdate = (req, res, next) => {
  const clientData = req.body;
  try {
    clientUpdateSchema.parse(clientData);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

module.exports = { validateClient, validateClientUpdate };

import express from "express";
import ClientController from "../controllers/clientController.js";
import { validateClient } from "../middlewares/validations.js";

const clientRouter = express.Router();
const clientController = new ClientController();

// clientRouter.get("/", clientController.getAll);
// clientRouter.get("/:id", clientController.getById);
// clientRouter.post("/", validateClient, clientController.create);
// clientRouter.put("/:id", validateClient, clientController.update);
// clientRouter.delete("/:id", clientController.delete);

export default clientRouter;

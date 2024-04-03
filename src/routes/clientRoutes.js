import express from "express";
import ClientController from "../controllers/clientController.js";
import { validateClient, validateClientUpdate } from "../middlewares/validations.js";

const clientRouter = express.Router();
const clientController = new ClientController();

// clientRouter.get("/", clientController.getClients);

clientRouter.get(
  "/",
  async (req, res) => await clientController.getClients(req, res)
);

clientRouter.get(
  "/:id",
  async (req, res) => await clientController.getClientById(req, res)
);

clientRouter.post("/", validateClientUpdate, async (req, res) => await clientController.createClient(req, res));

clientRouter.patch("/:id", validateClientUpdate, async (req, res) => await clientController.updateClient(req, res));

export default clientRouter;

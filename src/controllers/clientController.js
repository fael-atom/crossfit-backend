import { ClientService } from "../services/ClientService.js";
import { clientSchema, clientUpdateSchema } from "../models/schemas/clientSchemas.js";

class ClientController {
  constructor() {
    this.clientService = new ClientService();
  }

  async getClients(req, res) {
    // Adicione os parâmetros req, res aqui
    try {
      const clients = await this.clientService.getClients();
      return res.json(clients);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getClientById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const client = await this.clientService.getClientById(id);
      return res.json(client);
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: "Client not found" });
    }
  }

  async createClient(req, res) {
    try {
      const clientData = clientSchema.parse(req.body);
      const client = await this.clientService.createClient(clientData);
      res.status(201).json(client);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateClient(req, res) {
    try {
      const id = parseInt(req.params.id);
      const clientData = clientUpdateSchema.parse(req.body);
      const client = await this.clientService.updateClient(id, clientData);
      res.status(200).json(client);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteClient(req, res) {
    const id = parseInt(req.params.id);
    await this.clientService.deleteClient(id);
    res.sendStatus(204);
  }
}

export default ClientController;

import { z } from 'zod';
import { ClientService } from '../services/ClientService.js';

const clientSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number().int(),
});

class ClientController {
  constructor() {
    this.clientService = new ClientService();
  }

  async listClients(req, res) {
    const clients = await this.clientService.listClients();
    res.json(clients);
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

  async getClientById(req, res) {
    const id = parseInt(req.params.id);
    const client = await this.clientService.getClientById(id);
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  }

  async updateClient(req, res) {
    const id = parseInt(req.params.id);
    const clientData = clientSchema.parse(req.body);
    const client = await this.clientService.updateClient(id, clientData);
    res.json(client);
  }

  async deleteClient(req, res) {
    const id = parseInt(req.params.id);
    await this.clientService.deleteClient(id);
    res.sendStatus(204);
  }
}

export default ClientController
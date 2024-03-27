import { PrismaClient } from "@prisma/client";
import { Client } from "../models/Client.js";

const prisma = new PrismaClient();

export class ClientService {
  async listClients() {
    const clients = await prisma.cliente.findMany();
    return clients.map((client) => new Client(client));
  }

  async createClient(data) {
    const client = await prisma.cliente.create({ data });
    return new Client(client);
  }

  async getClientById(id) {
    const client = await prisma.client.findUnique({ where: { id } });
    if (client) {
      return new Client(client);
    }
    return null;
  }

  async updateClient(id, data) {
    const client = await prisma.client.update({ where: { id }, data });
    return new Client(client);
  }

  async deleteClient(id) {
    await prisma.client.delete({ where: { id } });
  }
}

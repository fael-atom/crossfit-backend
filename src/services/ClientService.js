import { Client } from "../models/Client.js";
import { prisma } from "../libs/prisma.js";

export class ClientService {
  async getClients() {
    const clients = await prisma.user.findMany();
    return clients.map((client) => new Client(client));
  }

  async getClientById(id) {
    const client = await prisma.user.findUnique({ where: { id: id } });
    return new Client(client);
  }

  async createClient(data) {
    const client = await prisma.user.create({ data });
    return new Client(client);
  }

  async updateClient(id, data) {
    const client = await prisma.user.update({
      where: { id: id },
      data
    });
    return new Client(client);
  }
}

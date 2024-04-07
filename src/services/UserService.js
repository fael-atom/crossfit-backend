import { User } from "../models/User.js";
import { prisma } from "../libs/prisma.js";

export class UserService {
  async getUsers() {
    const users = await prisma.user.findMany();
    return users.map((userData) => {
      const userInstance = new User(userData);
      return userInstance.getUser();
    });
  }

  async getUserById(id) {
    const userData = await prisma.user.findUnique({ where: { id: id } });
    const userInstance = new User(userData);
    return userInstance.getUser();
  }

  async createUser(data) {
    const userData = await prisma.user.create({ data });
    const userInstance = new User(userData);
    return userInstance;
  }

  async updateUser(id, data) {
    const userDataUpdated = await prisma.user.update({
      where: { id: id },
      data,
    });
    const userInstance = new User(userDataUpdated);
    return userInstance.getUser();
  }
}

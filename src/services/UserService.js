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

  async getUsersByName(name) {
    const firstName = name.split(" ")[0];
    const users = await prisma.user.findMany({
      where: {
        name: {
          startsWith: firstName,
          mode: "insensitive",
        },
      },
    });
    return users.map((userData) => {
      const userInstance = new User(userData);
      return userInstance.getUser();
    });
  }

  async getUsersByEmail(email) {
    const users = await prisma.user.findMany({
      where: {
        email: {
          startsWith: email,
          mode: "insensitive",
        },
      },
    });
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

  async createUser(data, file) {
    try {
      const userDataWithImage = {
        ...data,
        picture: `https://crossfit-backend.onrender.com/static/images/${file.filename}`,
      };
      const userData = await prisma.user.create({
        data: userDataWithImage,
      });
      const userInstance = new User(userData);
      return userInstance;
    } catch (error) {
      throw new Error("Erro ao criar usuário: " + error.message);
    }
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

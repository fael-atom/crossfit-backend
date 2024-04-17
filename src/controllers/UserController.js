import { UserService } from "../services/UserService.js";
import { userSchema, userUpdateSchema } from "../models/schemas/userSchema.js";

class UserController {
  constructor() {
    this.UserService = new UserService();
  }

  async getUsers(req, res) {
    try {
      const Users = await this.UserService.getUsers();
      return res.json(Users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getUsersByName(req, res) {
    try {
      const { name } = req.query;
      const Users = await this.UserService.getUsersByName(name);
      return res.json(Users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getUserById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const User = await this.UserService.getUserById(id);
      return res.json(User);
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: "User not found" });
    }
  }

  async createUser(req, res) {
    try {
      const UserData = userSchema.parse(req.body);
      const User = await this.UserService.createUser(UserData);
      res.status(201).json(User);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const id = parseInt(req.params.id);
      const UserData = userUpdateSchema.parse(req.body);
      const User = await this.UserService.updateUser(id, UserData);
      res.status(200).json(User);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteUser(req, res) {
    const id = parseInt(req.params.id);
    await this.UserService.deleteUser(id);
    res.sendStatus(204);
  }
}

export default UserController;

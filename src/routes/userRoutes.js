import express from "express";
import UserController from "../controllers/UserController.js";
import {
  validateUser,
  validateUserUpdate,
} from "../middlewares/validations.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.get("/", async (req, res) => {
  const { name, email } = req.query;

  if (name) {
    return await userController.getUsersByName(req, res);
  } else if (email) {
    return await userController.getUsersByEmail(req, res);
  } else {
    return await userController.getUsers(req, res);
  }
});

userRouter.get(
  "/:id",
  async (req, res) => await userController.getUserById(req, res)
);

userRouter.post(
  "/",
  validateUserUpdate,
  async (req, res) => await userController.createUser(req, res)
);

userRouter.patch(
  "/:id",
  validateUserUpdate,
  async (req, res) => await userController.updateUser(req, res)
);

export default userRouter;

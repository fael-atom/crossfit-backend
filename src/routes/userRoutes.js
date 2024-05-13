import express from "express";
import path from "path";
import UserController from "../controllers/UserController.js";
import multer from "multer";
import {
  validateUser,
  validateUserUpdate,
} from "../middlewares/validations.js";

const userRouter = express.Router();
const userController = new UserController();
const storage = multer.diskStorage({
  destination: "./public/images",
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.originalname + "-" + Date.now() + ext);
  },
});
const picture = multer({ storage: storage });

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
  // validateUserUpdate,
  picture.single("picture"),
  async (req, res) => await userController.createUser(req, res)
);

userRouter.patch(
  "/:id",
  validateUserUpdate,
  async (req, res) => await userController.updateUser(req, res)
);

export default userRouter;

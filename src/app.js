import express from "express";
import userRouter from "./routes/userRoutes.js";
import { corsMiddleware } from "./middlewares/cors.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };

export const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => res.redirect('/docs'))
app.use("/users", userRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

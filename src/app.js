import express from "express";
import clientRouter from "./routes/clientRoutes.js";
import { corsMiddleware } from "./middlewares/cors.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };

export const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(cors());
app.use("/clients", clientRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

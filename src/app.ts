import express from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./index";
import { errorHandler, notFoundHandler } from "./middlewares";

const app = express();

// Configuration
app.use(
  helmet({
    hsts: process.env.NODE_ENV === "production",
  })
);
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);

// Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

import express from "express";
import cors from "cors";

import { env } from "./config/env";

import activitiesRoutes from "./routes/activities.routes";
import projectsRoutes from "./routes/projects.routes";
import evmRoutes from "./routes/evm.routes";

const app = express();

// ----------------------------------------------------------------------
// MIDDLEWARES
// ----------------------------------------------------------------------

app.use(
  cors({
    origin: env.frontendUrl,
  }),
);

app.use(express.json());

// ----------------------------------------------------------------------
// HEALTH CHECK
// ----------------------------------------------------------------------

app.get("/api/health", (_req, res) => {
  return res.json({
    success: true,
    message: "EVM Dashboard Node API funcionando",
  });
});

// ----------------------------------------------------------------------
// ROUTES
// ----------------------------------------------------------------------

app.use("/api", activitiesRoutes);

app.use("/api", projectsRoutes);

app.use("/api", evmRoutes);

// ----------------------------------------------------------------------
// 404
// ----------------------------------------------------------------------

app.use((_req, res) => {
  return res.status(404).json({
    success: false,
    message: "Endpoint no encontrado.",
  });
});

export default app;

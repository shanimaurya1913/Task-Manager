import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import { notFoundHandler } from "./middlewares/error.middleware";
import { sendError, sendSuccess } from "./utils/apiResponse";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  sendSuccess(res, 200, "API is healthy");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use((_req, res) => {
  sendError(res, 404, "Route not found");
});

app.use(notFoundHandler);

export default app;

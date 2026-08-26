import express from "express";
import cors from "cors";
import helmet from "helmet";
import servicesRouter from "./routes/services";
import ordersRouter from "./routes/orders";
import { apiLimiter } from "./middleware/rateLimiter";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

export function createApp() {
  const app = express();

  const corsOrigins = (process.env.CORS_ORIGIN ?? "http://localhost:3000")
    .split(",")
    .map((o) => o.trim());

  app.use(helmet());
  app.use(
    cors({
      origin: corsOrigins,
      methods: ["GET", "POST"],
    })
  );
  app.use(express.json({ limit: "20kb" })); // small limit — this API only ever receives short order forms
  app.use(apiLimiter);

  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  app.use("/api/services", servicesRouter);
  app.use("/api/orders", ordersRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

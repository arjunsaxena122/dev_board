import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { limiter } from "./utils/rate-limiter";


const app: Application = express();

//? Middlewares
let options = {
  origin: ["*"],
  methods: ["GET", "PUT", "PATCH", "DELETE", "POST"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(options));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(limiter);

// Routes

import healthRouter from "./routes/health.route"
import userRouter from "./routes/user.route";
import projectRouter from "./routes/project.route";
import taskRouter from "./routes/task.route";

app.use(healthRouter)
app.use("/api/v1/user", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/project/:pid", taskRouter);

// Error Middleware
import errorHandler from "./middlewares/error.middleware";
app.use(errorHandler);

export default app;

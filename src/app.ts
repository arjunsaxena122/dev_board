import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();

//? Middlewares
let options = {
  origin: ["*"],
  methods: ["GET", "PUT", "PATCH", "DELETE", "POST"],
  credential: true,
};

app.use(cors(options));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(limiter);

// Routes

import userRouter from "./routes/user.route";
import projectRouter from "./routes/project.route";
import taskRouter from "./routes/task.route";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1//project/:pid/task", taskRouter);

// Error Middleware
import errorHandler from "./middlewares/error.middleware";
import { limiter } from "./utils/rate-limiter";
app.use(errorHandler);

export default app;

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

// Routes

import userRouter from "./routes/user.routes";
import errorHandler from "./middlewares/error.middleware";

app.use("/api/v1/user", userRouter);

// Error Middleware
app.use(errorHandler);

export default app;

import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api-error";
import { env } from "../config/config";

const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = Number(err.statusCode) ?? 500;

  res.status(statusCode).json({
    message: err.message ?? "Internal server error",
    errors: err.errors ?? [],
    success: err.success ?? false,
    statusCode: statusCode,
    stack: env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;

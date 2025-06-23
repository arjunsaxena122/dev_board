import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api-error";
import { ZodTypeAny } from "zod";

export const validate =
  (schema: ZodTypeAny, source: "body" | "query" | "params") =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req[source]);
      next();
    } catch (err) {
      throw new ApiError(400, "Zod validation failed", [err]);
    }
  };

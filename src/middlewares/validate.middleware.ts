import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api-error";
import { ZodTypeAny } from "zod";
import { Source } from "../types/validate.type";

export const validate =
  (schema: ZodTypeAny, source: Source[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data: Record<string, unknown> = {}
        for (const src of source) {
          Object.assign(data, req[src])
        }
        await schema.parseAsync(data);
        next();
      } catch (err) {
        throw new ApiError(400, "Zod validation failed", [err]);
      }
    };
import dotenv from "dotenv";
import { z } from "zod";
import { ApiError } from "../utils/api-error";

dotenv.config({
  path: "./.env",
});

const envSchema = z.object({
  PORT: z.string().optional(),
  NODE_ENV: z.string().optional(),
});

const createEnv = (env: NodeJS.ProcessEnv) => {
  const validateResult = envSchema.safeParse(env);

  if (!validateResult.success) {
    throw new ApiError(400, `Invalidate ${env}`, [validateResult]);
  }

  return validateResult.data;
};


export const env = createEnv(process.env);


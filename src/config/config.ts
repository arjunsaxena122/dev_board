import dotenv from "dotenv";
import { z } from "zod";
import { ApiError } from "../utils/api-error";

dotenv.config({
  path: "./.env",
});

const envSchema = z.object({
  PORT: z.string().optional(),
  NODE_ENV: z.string().optional(),
  ACCESS_TOKEN_KEY: z.string().min(1),
  ACCESS_TOKEN_EXPIRY: z.string().min(1),
  REFRESH_TOKEN_KEY: z.string().min(1),
  REFRESH_TOKEN_EXPIRY: z.string().min(1),
});

const createEnv = (env: NodeJS.ProcessEnv) => {
  const validateResult = envSchema.safeParse(env);

  if (!validateResult.success) {
    throw new ApiError(400, `Invalidate ${env}`, [validateResult]);
  }

  return validateResult.data;
};

export const env = createEnv(process.env) as {
  ACCESS_TOKEN_KEY: string;
  ACCESS_TOKEN_EXPIRY: string;
  REFRESH_TOKEN_KEY: string;
  REFRESH_TOKEN_EXPIRY: string;
  PORT?: string;
  NODE_ENV?: string;
};

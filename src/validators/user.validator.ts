import { z } from "zod";
import { prisma } from "../lib/prisma";


export const userRegisterValidationSchema = z.object({
  username: z.string({
    message: "username must be in string"
  }).trim().nonempty({
    message: "username field is required",
  }),
  email: z
    .string()
    .trim()
    .nonempty({
      message: "email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: z
    .string()
    .trim()
    .nonempty({
      message: "Password is required",
    })
    .min(8, { message: "Password must be minimum 8 length" })
    .max(16, { message: "Password length exceed" }),
});

export const userLoginValidationSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({
      message: "email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: z
    .string()
    .trim()
    .nonempty({
      message: "Password is required",
    })
    .min(8, { message: "Password must be minimum 8 length" })
    .max(16, { message: "Password length exceed" }),
});


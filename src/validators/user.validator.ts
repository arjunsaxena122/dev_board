import { z } from "zod";
import prisma from "../db/db";


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

export const userLogoutValidationSchema = z.object({
  id: z.string().cuid().refine(async (id) => {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    // ! I can write also Boolean(user) instead of this !!user
    return !!user
  }, "Invalid userID")
});

export const userGetValidationSchema = z.object({
  id: z.string().cuid().refine(async (id) => {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    return !!user
  }, "Invalid userID")
});

export const userApiKeyValidationSchema = z.object({
  id: z.string().cuid().refine(async (id) => {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    return !!user
  }, "Invalid userID"),

  refreshToken: z.string().min(1, "RefreshToken is required")

});

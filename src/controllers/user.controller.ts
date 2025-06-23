import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { ApiError } from "../utils/api-error";
import prisma from "../db/db";
import { ApiResponse } from "../utils/api-response";
import bcrypt from "bcryptjs";
import { randomString } from "../utils/randomBytes";

export const userRegister = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new ApiError(400, "Please fill all the required fields");
    }

    const existedUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existedUser) {
      throw new ApiError(400, "Credentionals already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const createdUser = await prisma.user.findUnique({
      where: { id: user?.id },
    });

    if (!createdUser) {
      throw new ApiError(
        500,
        "Internal server error, user not registered yet, Please try again!",
      );
    }

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          "Credentional registered successfully",
          createdUser,
        ),
      );
  },
);

export const userLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please fill all the required fields");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(400, "Invalid credentional, Please Login!");
  }

  const isCheckHashedPassword = await bcrypt.compare(password, user?.password);

  if (!isCheckHashedPassword) {
    throw new ApiError(400, "Invalid credentional, Please Login!");
  }

  const loggedInUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      username: true,
      fullname: true,
      email: true,
      isEmailVerified: true,
    },
  });

  if (!loggedInUser) {
    throw new ApiError(500, "Internal Server issue with Login");
  }
});

export const userLogout = asyncHandler(
  async (req: Request, res: Response) => {},
);

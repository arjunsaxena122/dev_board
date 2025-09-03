import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { ApiError } from "../utils/api-error";
import prisma from "../db/db";
import { ApiResponse } from "../utils/api-response";
import bcrypt from "bcryptjs";
import { env } from "../config/config";
import { generatAccessAndRefreshToken } from "../utils/generateToken";
import { Iuser } from "../middlewares/auth.middleware";

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

    const avatar = await prisma.avatar.create({
      data: {
        localPath: "data",
        user: {
          connect: { id: user?.id },
        },
      },
      include: {
        user: true,
      },
    });

    const createdUser = await prisma.user.findUnique({
      where: { id: user?.id },
      select: {
        id: true,
        email: true,
        fullname: true,
        username: true,
        avatar: true,
      },
    });

    if (!createdUser) {
      throw new ApiError(
        500,
        "Internal server error, user not registered yet, Please try again!",
      );
    }

    return res.status(201).json(
      new ApiResponse(201, "Credentional registered successfully", {
        createdUser,
        avatar,
      }),
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
      avatar: true,
      username: true,
      fullname: true,
      email: true,
      isEmailVerified: true,
    },
  });

  if (!loggedInUser) {
    throw new ApiError(500, "Internal Server issue with Login");
  }

  const { accessToken, refreshToken } = await generatAccessAndRefreshToken(
    user?.id,
  );

  const accessOptions = {
    httpOnly: true,
    secure: true,
    strict: env.NODE_ENV === "development" ? "none" : "strict",
    maxAge: 1000 * 60 * 30,
  };

  const refreshOption = {
    httpOnly: true,
    secure: true,
    strict: env.NODE_ENV === "development" ? "none" : "strict",
    maxAge: 1000 * 60 * 60 * 24,
  };

  return res
    .cookie("accessToken", accessToken, accessOptions)
    .cookie("refreshToken", refreshToken, refreshOption)
    .json(new ApiResponse(200, "Login successfully", loggedInUser));
});

export const userLogout = asyncHandler(async (req: Request, res: Response) => {
  const { id } = (req as Iuser).user;

  if (!id) {
    throw new ApiError(400, "requested id not found");
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new ApiError(400, "user not found");
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { refreshToken: null },
    select: {
      id: true,
      username: true,
      email: true,
      isEmailVerified: true,
    },
  });

  if (!updatedUser) {
    throw new ApiError(500, "Internal server issue with user logout");
  }

  const options = {
    httpOnly: true,
    secure: true,
    strict: env.NODE_ENV === "development" ? "none" : "strict",
  };

  return res
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .status(200)
    .json(new ApiResponse(200, "Logout successfully", updatedUser));
});

export const apiKey = asyncHandler(async (req: Request, res: Response) => {
  const { id } = (req as Iuser).user;
  const incomingRefreshToken = req?.cookies?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(400, "Please Login!");
  }

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(400, "ACESS DENIED: Unauthorised access");
  }

  const { accessToken, refreshToken } = await generatAccessAndRefreshToken(
    user?.id,
  );

  if (!accessToken || !refreshToken) {
    throw new ApiError(
      500,
      "Internal server error, Tokens are not generated still",
    );
  }

  const accessOptions = {
    httpOnly: true,
    secure: true,
    strict: env.NODE_ENV === "development" ? "none" : "strict",
    maxAge: 1000 * 60 * 30,
  };

  const refreshOption = {
    httpOnly: true,
    secure: true,
    strict: env.NODE_ENV === "development" ? "none" : "strict",
    maxAge: 1000 * 60 * 60 * 24,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, accessOptions)
    .cookie("refreshToken", refreshToken, refreshOption)
    .json(new ApiResponse(200, "Tokens re-generated successfully"));
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const { id } = (req as Iuser).user;

  if (!id) {
    throw new ApiError(400, "unauthorised access");
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      fullname: true,
      username: true,
      email: true,
      isEmailVerified: true,
    },
  });

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, `${user?.username} profile data`, user));
});

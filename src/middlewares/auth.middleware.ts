import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error";
import jwt from "jsonwebtoken";
import { env } from "../config/config";
import prisma from "../db/db";

export interface Iuser extends Request {
  user: jwt.JwtPayload;
}

const verifyJwt = async (req: Request, res: Response, next: NextFunction) => {
  const token =
    req?.cookies?.accessToken ??
    req?.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(400, "token not exist");
  }

  const decodeToken = jwt.verify(token, env.ACCESS_TOKEN_KEY) as jwt.JwtPayload;

  if (!decodeToken) {
    throw new ApiError(400, "Invalid token");
  }

  (req as Iuser).user = decodeToken;

  // const user = await prisma.user.findUnique({
  //   where: { id: (decodeToken as jwt.JwtPayload).id },
  //   select: {
  //     id: true,
  //     username: true,
  //     email: true,
  //     fullname: true,
  //     isEmailVerified: true,
  //   },
  // });

  // if (!user) {
  //   throw new ApiError(400, "user not found");
  // }

  // (req as Iuser).user = user;

  // console.log(user)

  next();
};

export { verifyJwt };

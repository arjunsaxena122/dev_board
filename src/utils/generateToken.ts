import { env } from "../config/config";
import prisma from "../db/db";
import { ApiError } from "./api-error";
import jwt from "jsonwebtoken";

export const generatAccessAndRefreshToken = async (
  id: string,
): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new ApiError(400, "Can't generate token due to user not found");
    }

    const accessToken = jwt.sign(
      {
        id: user?.id,
      },
      env.ACCESS_TOKEN_KEY,
      { expiresIn: env.ACCESS_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"] },
    );

    const refreshToken = jwt.sign(
      {
        id: user?.id,
      },
      env.REFRESH_TOKEN_KEY,
      { expiresIn: env.REFRESH_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"] },
    );

    const token = { accessToken, refreshToken };

    return token;
  } catch (err) {
    throw new ApiError(400, "Token aren't generated due to", [err]);
  }
};

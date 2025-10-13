import { env } from "../config/config";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
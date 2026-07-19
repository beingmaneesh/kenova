import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function getPrisma() {
  if (!globalForPrisma.prisma) {
    const adapter = new PrismaMariaDb({
      host: process.env.DB_HOST || "127.0.0.1",
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || undefined,
      database: process.env.DB_NAME || "kenova_db",
    });
    globalForPrisma.prisma = new PrismaClient({ adapter });
  }
  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    return (getPrisma() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function parseDbUrl(raw: string) {
  const url = new URL(raw.replace(/^mysql:\/\//, "mariadb://"));
  return {
    host: url.hostname || "localhost",
    port: Number(url.port) || 3306,
    user: decodeURIComponent(url.username) || "root",
    password: url.password ? decodeURIComponent(url.password) : undefined,
    database: url.pathname.replace(/^\//, "") || undefined,
  };
}

function getPrisma() {
  if (!globalForPrisma.prisma) {
    const raw = process.env.DATABASE_URL || "mysql://root@127.0.0.1:3306/kenova_db";
    const config = parseDbUrl(raw);
    const adapter = new PrismaMariaDb(config);
    globalForPrisma.prisma = new PrismaClient({ adapter });
  }
  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    return (getPrisma() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

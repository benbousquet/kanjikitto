import type { Config } from "drizzle-kit";

export default {
  schema: "./database/schema/*",
  out: "./drizzle",
  driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString: process.env.DB_URL!,
  },
} satisfies Config;

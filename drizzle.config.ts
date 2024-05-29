import type { Config } from "drizzle-kit";
import dotenv from 'dotenv';
dotenv.config()

export default {
  dialect: "postgresql",
  schema: "./src/database/schemas/index.ts",
  out: "./src/database/migrations",
  verbose: true,
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
    ssl: {
      rejectUnauthorized: false,
    },
  },
} satisfies Config;

import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql",
  schema: "./src/database/schemas/index.ts",
  out: "./src/database/migrations",
  verbose: true,
  dbCredentials: {
    connectionString: "postgres://postgres:123@localhost:5432/ocean"!,
  },
} satisfies Config;

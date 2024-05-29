import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql",
  schema: "./src/database/schemas/index.ts",
  out: "./src/database/migrations",
  verbose: true,
  dbCredentials: {
    connectionString: "postgres://tobRoot:techOcean15@tech-ocean-blue.postgres.database.azure.com:5432/ocean",
  },
} satisfies Config;

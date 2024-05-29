import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql",
  schema: "./src/database/schemas/index.ts",
  out: "./src/database/migrations",
  verbose: true,
  dbCredentials: {
    connectionString: "postgres://default:yKfa9sZx6JeT@ep-muddy-king-a5986ngf-pooler.us-east-2.aws.neon.tech:5432/verceldb?sslmode=require"!,
  },
} satisfies Config;

import { Pool } from "pg"
import {drizzle as Drizzle} from "drizzle-orm/node-postgres"
import * as schema from "./schemas/index"

export const pool = new Pool({
    connectionString:"postgres://default:yKfa9sZx6JeT@ep-muddy-king-a5986ngf-pooler.us-east-2.aws.neon.tech:5432/verceldb?sslmode=require"
})

export const dataBase = Drizzle(pool, {schema})
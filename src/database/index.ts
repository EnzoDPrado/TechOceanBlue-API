import { Pool } from "pg"
import {drizzle as Drizzle} from "drizzle-orm/node-postgres"
import * as schema from "./schemas/index"
import dotenv from 'dotenv';
dotenv.config()
export const pool = new Pool({
    connectionString:  process.env.DATABASE_URL ?? "",
    ssl: {
        rejectUnauthorized: false,
    }
})

export const dataBase = Drizzle(pool, {schema})
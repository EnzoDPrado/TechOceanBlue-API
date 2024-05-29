import { Pool } from "pg"
import {drizzle as Drizzle} from "drizzle-orm/node-postgres"
import * as schema from "./schemas/index"

export const pool = new Pool({
    connectionString: "postgres://postgres:123@localhost:5432/ocean"
})

export const dataBase = Drizzle(pool, {schema})
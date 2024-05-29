import { doublePrecision, timestamp } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const ocean = pgTable("tbl_ocean", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull().unique(),
  latitudeMin: doublePrecision("latitude_min").notNull(),
  longitudeMin: doublePrecision("longitude_min").notNull(),
  latitudeMax: doublePrecision("latitude_max").notNull(),
  longitudeMax: doublePrecision("longitude_max").notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export type Ocean = typeof ocean.$inferSelect
export type NewOcean = typeof ocean.$inferInsert
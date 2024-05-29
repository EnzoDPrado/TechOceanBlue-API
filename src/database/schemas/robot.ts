import { doublePrecision, timestamp } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const robot = pgTable("tbl_robot", {
  id: uuid("id").primaryKey().defaultRandom(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull()
});

export type Robot = typeof robot.$inferSelect
export type NewRobot = typeof robot.$inferInsert
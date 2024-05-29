import { doublePrecision, timestamp } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { robot } from "./robot";

export const trash = pgTable("tbl_trash", {
  id: uuid("id").primaryKey().defaultRandom(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
  robotId: uuid("robot_id")
    .references(() => robot.id)
    .notNull(),
});

export type Trash = typeof trash.$inferSelect;
export type NewTrash = typeof trash.$inferInsert;

import { doublePrecision, timestamp } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { ocean } from "./ocean";
import { trash } from "./trash";

export const oceanTrash = pgTable("tbl_ocean_trash", {
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
  oceanId: uuid("ocean_id")
    .references(() => ocean.id)
    .notNull(),
  trashId: uuid("trash_id")
    .references(() => trash.id)
    .notNull(),
});

export type OceanTrash = typeof oceanTrash.$inferSelect;
export type NewOceanTrash = typeof oceanTrash.$inferInsert;

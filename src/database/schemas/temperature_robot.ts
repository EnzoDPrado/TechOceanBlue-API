import { doublePrecision, timestamp } from "drizzle-orm/pg-core";
import { uuid, integer } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { robot } from "./robot";
import { ocean } from "./ocean";

export const temperatureRobot = pgTable("tbl_temperature_robot", {
  id: uuid("id").primaryKey().defaultRandom(),
  robotId: uuid("robot_id")
    .references(() => robot.id)
    .notNull(),
  oceanId: uuid("ocean_id")
    .references(() => ocean.id)
    .notNull(),
  temperatureCelsius: integer("temperature_celsius").notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull()
});

export type TemperatureRobot = typeof temperatureRobot.$inferSelect
export type NewTemperatureRobot = typeof temperatureRobot.$inferInsert
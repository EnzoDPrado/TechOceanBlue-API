"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.temperatureRobot = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
const pg_core_3 = require("drizzle-orm/pg-core");
const robot_1 = require("./robot");
const ocean_1 = require("./ocean");
exports.temperatureRobot = (0, pg_core_3.pgTable)("tbl_temperature_robot", {
    id: (0, pg_core_2.uuid)("id").primaryKey().defaultRandom(),
    robotId: (0, pg_core_2.uuid)("robot_id")
        .references(() => robot_1.robot.id)
        .notNull(),
    oceanId: (0, pg_core_2.uuid)("ocean_id")
        .references(() => ocean_1.ocean.id)
        .notNull(),
    temperatureCelsius: (0, pg_core_2.integer)("temperature_celsius").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at")
        .$defaultFn(() => new Date())
        .notNull()
});
//# sourceMappingURL=temperature_robot.js.map
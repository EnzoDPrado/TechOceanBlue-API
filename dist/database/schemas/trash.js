"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trash = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
const pg_core_3 = require("drizzle-orm/pg-core");
const robot_1 = require("./robot");
exports.trash = (0, pg_core_3.pgTable)("tbl_trash", {
    id: (0, pg_core_2.uuid)("id").primaryKey().defaultRandom(),
    latitude: (0, pg_core_1.doublePrecision)("latitude").notNull(),
    longitude: (0, pg_core_1.doublePrecision)("longitude").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at")
        .$defaultFn(() => new Date())
        .notNull(),
    robotId: (0, pg_core_2.uuid)("robot_id")
        .references(() => robot_1.robot.id)
        .notNull(),
});
//# sourceMappingURL=trash.js.map
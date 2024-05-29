"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.robot = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
const pg_core_3 = require("drizzle-orm/pg-core");
exports.robot = (0, pg_core_3.pgTable)("tbl_robot", {
    id: (0, pg_core_2.uuid)("id").primaryKey().defaultRandom(),
    latitude: (0, pg_core_1.doublePrecision)("latitude").notNull(),
    longitude: (0, pg_core_1.doublePrecision)("longitude").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at")
        .$defaultFn(() => new Date())
        .notNull()
});
//# sourceMappingURL=robot.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ocean = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
const pg_core_3 = require("drizzle-orm/pg-core");
const pg_core_4 = require("drizzle-orm/pg-core");
exports.ocean = (0, pg_core_4.pgTable)("tbl_ocean", {
    id: (0, pg_core_3.uuid)("id").primaryKey().defaultRandom(),
    name: (0, pg_core_2.varchar)("name").notNull().unique(),
    latitudeMin: (0, pg_core_1.doublePrecision)("latitude_min").notNull(),
    longitudeMin: (0, pg_core_1.doublePrecision)("longitude_min").notNull(),
    latitudeMax: (0, pg_core_1.doublePrecision)("latitude_max").notNull(),
    longitudeMax: (0, pg_core_1.doublePrecision)("longitude_max").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at")
        .$defaultFn(() => new Date())
        .notNull(),
});
//# sourceMappingURL=ocean.js.map
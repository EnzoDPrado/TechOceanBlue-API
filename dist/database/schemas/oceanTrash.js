"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oceanTrash = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
const pg_core_3 = require("drizzle-orm/pg-core");
const ocean_1 = require("./ocean");
const trash_1 = require("./trash");
exports.oceanTrash = (0, pg_core_3.pgTable)("tbl_ocean_trash", {
    createdAt: (0, pg_core_1.timestamp)("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at")
        .$defaultFn(() => new Date())
        .notNull(),
    oceanId: (0, pg_core_2.uuid)("ocean_id")
        .references(() => ocean_1.ocean.id)
        .notNull(),
    trashId: (0, pg_core_2.uuid)("trash_id")
        .references(() => trash_1.trash.id)
        .notNull(),
});
//# sourceMappingURL=oceanTrash.js.map
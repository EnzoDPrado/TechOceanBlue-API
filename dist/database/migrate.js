"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const migrator_1 = require("drizzle-orm/node-postgres/migrator");
const node_path_1 = __importDefault(require("node:path"));
const _1 = require(".");
async function main() {
    await (0, migrator_1.migrate)(_1.dataBase, {
        migrationsFolder: node_path_1.default.resolve(process.cwd(), "src", "database", "migrations"),
    });
    await _1.pool.end();
    console.log("Finished migrating drizzle");
}
main();
//# sourceMappingURL=migrate.js.map
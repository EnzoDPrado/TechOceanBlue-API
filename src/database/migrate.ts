import { migrate } from "drizzle-orm/node-postgres/migrator";
import path from "node:path";
import { dataBase, pool } from ".";

async function main() {
  await migrate(dataBase, {
    migrationsFolder: path.resolve(
      process.cwd(),
      "src",
      "database",
      "migrations",
    ),
  });

  await pool.end();
  console.log("Finished migrating drizzle");
}

main();

import "server-only";

import { int, text, index, singlestoreTableCreator, bigint } from "drizzle-orm/singlestore-core";

const createTable = singlestoreTableCreator(name => `drive_${name}`);

export const files = createTable("files_table", {
    id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
    parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
    size: int("size").notNull(),
    name: text("name").notNull(),
    url: text("url").notNull(),
}, f => [index("parent_index").on(f.parent)])

export const folders = createTable("folders_table", {
    id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
    parent: bigint("parent", { mode: "number", unsigned: true }),
    name: text("name").notNull(),
});

import { int, text, index, singlestoreTableCreator, bigint } from "drizzle-orm/singlestore-core";

const createTable = singlestoreTableCreator(name => `drive_${name}`);

export const filesTable = createTable("files_table", {
    id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
    parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
    size: int("size").notNull(),
    name: text("name").notNull(),
    url: text("url").notNull(),
}, f => [index("parent_index").on(f.parent)])

export const foldersTable = createTable("folders_table", {
    id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
    parent: bigint("parent", { mode: "number", unsigned: true }),
    name: text("name").notNull(),
});

export type DbFileType = typeof filesTable.$inferSelect;
export type DbFolderType = typeof foldersTable.$inferSelect;

import { int, text, index, singlestoreTableCreator, bigint, timestamp } from "drizzle-orm/singlestore-core";

const createTable = singlestoreTableCreator((name) => `drive_${name}`);

export const filesTable = createTable(
    "files_table",
    {
        id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
        ownerId: text("owner_id").notNull(),

        parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
        size: int("size").notNull(),
        name: text("name").notNull(),
        url: text("url").notNull(),
        ufsKey: text("ufs_key").notNull(),
        createdAt: timestamp("created_at").notNull().defaultNow(),
    },
    (f) => [index("parent_index").on(f.parent), index("owner_id_index").on(f.ownerId)],
);

export const foldersTable = createTable(
    "folders_table",
    {
        id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
        ownerId: text("owner_id").notNull(),

        parent: bigint("parent", { mode: "number", unsigned: true }),
        name: text("name").notNull(),
        createdAt: timestamp("created_at").notNull().defaultNow(),
    },
    (f) => [index("parent_index").on(f.parent), index("owner_id_index").on(f.ownerId)],
);

export type DbFileType = typeof filesTable.$inferSelect;
export type DbFolderType = typeof foldersTable.$inferSelect;

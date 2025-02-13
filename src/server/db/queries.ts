import { and, eq, isNull } from "drizzle-orm";
import { db } from "~/server/db";
import { filesTable, foldersTable } from "~/server/db/schema";

export const QUERIES = {
    getAllParents: async function(folderId: number) {
        const parents = [];

        let currFolderId: number | null = folderId;
        while (currFolderId != null) {
            const [currFolder] = await db.select().from(foldersTable).where(eq(foldersTable.id, currFolderId));

            if (!currFolder) {
                throw new Error("Invalid folderId");
            }
            parents.unshift(currFolder);
            currFolderId = currFolder.parent ?? null;
        }
        return parents;
    },

    getUserRootFolderId: function(userId: string) {
        return db
            .select({ id: foldersTable.id })
            .from(foldersTable)
            .where(and(eq(foldersTable.ownerId, userId), isNull(foldersTable.parent)));
    },

    getFiles: function(parsedFolderId: number) {
        return db.select().from(filesTable).where(eq(filesTable.parent, parsedFolderId)).orderBy(filesTable.name);
    },

    getFolders: function(parsedFolderId: number) {
        return db.select().from(foldersTable).where(eq(foldersTable.parent, parsedFolderId)).orderBy(foldersTable.name);
    },

    getFolderById: function(folderId: number) {
        return db.selectDistinct().from(foldersTable).where(eq(foldersTable.id, folderId));
    },
};

type CreateFIleParams = {
    file: {
        name: string;
        size: number;
        url: string;
        ufsKey: string;
        parent: number;
    };
    userId: string;
};
export const MUTATIONS = {
    createFile: async function({ file, userId }: CreateFIleParams) {
        return await db.insert(filesTable).values({ ...file, ownerId: userId });
    },

    createRootFolder: async function(ownerId: string) {
        const [root] = await db
            .insert(foldersTable)
            .values({
                ownerId,
                name: "root",
                parent: null,
            })
            .$returningId();

        if (!root) {
            throw new Error("Error while creating root folder");
        }

        const defaultFolders = ["Images", "Videos"].map((name) => ({
            ownerId,
            name,
            parent: root.id,
        }));

        await db.insert(foldersTable).values(defaultFolders);

        return root;
    },
};

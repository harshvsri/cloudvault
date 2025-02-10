import { eq } from "drizzle-orm";
import { db } from "~/server/db"
import { filesTable, foldersTable } from "~/server/db/schema"

export const QUERIES = {
    getAllParents: async function(folderId: number) {
        const parents = [];

        let currFolderId: number | null = folderId;
        while (currFolderId != null) {
            const folder = await db
                .select()
                .from(foldersTable)
                .where(eq(foldersTable.id, folderId))

            if (!folder[0]) {
                throw new Error("No parent found");
            }
            parents.unshift(folder[0]);
            currFolderId = folder[0].id ?? null;
        }
        return parents;
    },

    getFiles: function(parsedFolderId: number) {
        return db
            .select()
            .from(filesTable)
            .where(eq(filesTable.parent, parsedFolderId));
    },

    getFolders: function(parsedFolderId: number) {
        return db
            .select()
            .from(foldersTable)
            .where(eq(foldersTable.parent, parsedFolderId));
    },

    getFolderById: function(folderId: number) {
        return db
            .selectDistinct()
            .from(foldersTable)
            .where(eq(foldersTable.id, folderId))
    }
}

type CreateFIleParams = {
    file: {
        name: string,
        size: number,
        url: string,
        parent: number
    };
    userId: string;
}
export const MUTATIONS = {
    createFile: async function({ file, userId }: CreateFIleParams) {
        return await db.insert(filesTable).values({ ...file, ownerId: userId });
    }
}

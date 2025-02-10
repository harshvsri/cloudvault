import { eq } from "drizzle-orm";
import { db } from "~/server/db"
import { files as filesTable, folders as foldersTable } from "~/server/db/schema"

export const getAllParents = async (folderId: number) => {
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
}

export const getFiles = (parsedFolderId: number) => {
    return db
        .select()
        .from(filesTable)
        .where(eq(filesTable.parent, parsedFolderId));
}

export const getFolders = (parsedFolderId: number) => {
    return db
        .select()
        .from(foldersTable)
        .where(eq(foldersTable.parent, parsedFolderId));
}

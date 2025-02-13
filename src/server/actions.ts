"use server";
import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { filesTable, foldersTable } from "./db/schema";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { UTApi } from "uploadthing/server";


export async function deleteFile(fileId: number) {
    const { userId } = await auth();
    if (!userId) {
        return { error: "Unauthorized" };
    }

    const [file] = await db
        .select()
        .from(filesTable)
        .where(and(eq(filesTable.id, fileId), eq(filesTable.ownerId, userId)));

    if (!file) {
        return { error: "File not found" };
    }

    const utAPI = new UTApi();
    const { success, deletedCount } = await utAPI.deleteFiles(file.url.replace("https://utfs.io/f/", ""));
    console.log(`[${success}]: ${deletedCount} files deleted.`);

    const dbResult = await db.delete(filesTable).where(eq(filesTable.id, fileId));
    console.log(dbResult);

    const c = await cookies();
    c.set("force-refresh", JSON.stringify(Math.random()));

    return { success: true };
}

export async function deleteFolder(folderId: number) {
    const { userId } = await auth();
    if (!userId) {
        return { error: "Unauthorized" };
    }

    //FIX: This will just remove the folder not the content inside them.
    const dbResult = await db.delete(foldersTable).where(eq(foldersTable.id, folderId));
    console.log(dbResult);

    const c = await cookies();
    c.set("force-refresh", JSON.stringify(Math.random()));

    return { success: true };
}

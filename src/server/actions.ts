"use server";
import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { filesTable } from "./db/schema";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

export async function deleteFile(fileId: number) {
    const session = await auth();
    if (!session.userId) {
        return { error: "Unauthorized" };
    }

    const [file] = await db
        .select()
        .from(filesTable)
        .where(and(eq(filesTable.id, fileId), eq(filesTable.ownerId, session.userId)));

    if (!file) {
        return { error: "File not found" };
    }
    //TODO: Remove from the uploadthing server

    const dbResult = await db.delete(filesTable).where(eq(filesTable.id, fileId));
    console.log(dbResult);

    //HACK: This forces a refresh.
    const c = await cookies();
    c.set("force-refresh", JSON.stringify(Math.random()));

    return { success: true };
}

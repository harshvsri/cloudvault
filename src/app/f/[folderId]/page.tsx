import { eq } from "drizzle-orm";
import DriveContent from "~/components/content";
import { db } from "~/server/db"
import { files as fileSchema, folders as folderSchema } from "~/server/db/schema"

interface DriveProps {
    params: Promise<{ folderId: string }>
}

export default async function Drive({ params }: DriveProps) {
    const param = await params;

    const parsedFolderId = parseInt(param.folderId);
    if (isNaN(parsedFolderId)) {
        return <h1>404: INVALID FOLDER ID</h1>
    }

    const files = await db
        .select()
        .from(fileSchema)
        .where(eq(fileSchema.parent, parsedFolderId));

    const folders = await db
        .select()
        .from(folderSchema)
        .where(eq(folderSchema.parent, parsedFolderId));

    return <DriveContent files={files} folders={folders} />
}

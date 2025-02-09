import DriveContent from "~/components/content";
import { db } from "~/server/db"
import { files as fileSchema, folders as folderSchema } from "~/server/db/schema"

export default async function Drive() {
    const files = await db.select().from(fileSchema);
    const folders = await db.select().from(folderSchema);
    return <DriveContent files={files} folders={folders} />
}

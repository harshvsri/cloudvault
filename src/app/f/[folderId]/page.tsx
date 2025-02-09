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

    const getAllParents = async (folderId: number) => {
        const parents = [];

        let currFolderId: number | null = folderId;
        while (currFolderId != null) {
            const folder = await db
                .select()
                .from(folderSchema)
                .where(eq(folderSchema.id, folderId))

            if (!folder[0]) {
                throw new Error("No parent found");
            }
            parents.unshift(folder[0]);
            currFolderId = folder[0].id ?? null;
        }
        return parents;
    }

    const filesPromise = db
        .select()
        .from(fileSchema)
        .where(eq(fileSchema.parent, parsedFolderId));

    const foldersPromise = db
        .select()
        .from(folderSchema)
        .where(eq(folderSchema.parent, parsedFolderId));

    //FIX: The db is taking too much time, i mean toooooo much so f**k it.
    // const parentsPromise = getAllParents(parsedFolderId);

    const parents: typeof folders = [];
    const [files, folders] = await Promise.all([filesPromise, foldersPromise]);

    return <DriveContent files={files} folders={folders} parents={parents} />
}

import DriveContent from "~/components/content";
import { getFiles, getFolders } from "~/server/db/queries";

interface DriveProps {
    params: Promise<{ folderId: string }>
}

export default async function Drive({ params }: DriveProps) {
    const param = await params;

    const parsedFolderId = parseInt(param.folderId);
    if (isNaN(parsedFolderId)) {
        return <h1>404: INVALID FOLDER ID</h1>
    }

    //FIX: It's taking too much time to run getAllParents, i mean toooooo much so f**k it.
    const parents: typeof folders = [];
    const [files, folders] = await Promise.all([getFiles(parsedFolderId), getFolders(parsedFolderId)]);

    return <DriveContent files={files} folders={folders} parents={parents} />
}

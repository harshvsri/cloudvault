import { notFound } from "next/navigation";
import DriveContent from "~/components/content";
import { QUERIES } from "~/server/db/queries";

interface DriveProps {
    params: Promise<{ folderId: string }>
}

export default async function Drive({ params }: DriveProps) {
    const param = await params;
    const parsedFolderId = parseInt(param.folderId);
    if (isNaN(parsedFolderId)) {
        notFound();
    }

    //FIX: It's taking too much time to run getAllParents, i mean toooooo much so f**k it.
    const parents: typeof folders = [];
    const [files, folders] = await Promise.all([
        QUERIES.getFiles(parsedFolderId),
        QUERIES.getFolders(parsedFolderId),
    ]);

    return <DriveContent files={files} folders={folders} parents={parents} folderId={parsedFolderId} />
}

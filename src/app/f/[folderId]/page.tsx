import { notFound } from "next/navigation";
import DriveContent from "~/components/content";
import { QUERIES } from "~/server/db/queries";

interface DriveProps {
    params: Promise<{ folderId: string }>;
}

export default async function Drive({ params }: DriveProps) {
    const param = await params;
    const parsedFolderId = parseInt(param.folderId);
    if (isNaN(parsedFolderId)) {
        notFound();
    }

    const [files, folders, parents] = await Promise.all([
        QUERIES.getFiles(parsedFolderId),
        QUERIES.getFolders(parsedFolderId),
        QUERIES.getAllParents(parsedFolderId)
    ]);

    return <DriveContent files={files} folders={folders} parents={parents} folderId={parsedFolderId} />;
}

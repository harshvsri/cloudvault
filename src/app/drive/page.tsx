import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MUTATIONS, QUERIES } from "~/server/db/queries";

export default async function DrivePage() {
    const { userId } = await auth();
    if (!userId) {
        redirect("/");
    }

    const [rootFolder] = await QUERIES.getUserRootFolder(userId);
    if (!rootFolder) {
        const rootFolderId = await MUTATIONS.createRootFolder(userId);
        redirect(`/f/${rootFolderId.id}`);
    }

    redirect(`/f/${rootFolder.id}`);
}

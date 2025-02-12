import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MUTATIONS, QUERIES } from "~/server/db/queries";

export default async function DrivePage() {
    const { userId } = await auth();
    if (!userId) {
        redirect("/");
    }

    const [rootFolder] = await QUERIES.getUserRootFolderId(userId);
    if (!rootFolder) {
        const rootFolder = await MUTATIONS.createRootFolder(userId);
        redirect(`/f/${rootFolder.id}`);
    }

    redirect(`/f/${rootFolder.id}`);
}

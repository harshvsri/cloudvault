import Home from "~/components/home";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MUTATIONS, QUERIES } from "~/server/db/queries";

export default async function Root() {
    const { userId } = await auth();
    if (!userId) return <Home />;

    const [rootFolder] = await QUERIES.getUserRootFolderId(userId);
    if (!rootFolder) {
        const rootFolder = await MUTATIONS.createRootFolder(userId);
        redirect(`/drive/${rootFolder.id}`);
    }
    redirect(`/drive/${rootFolder.id}`);
}

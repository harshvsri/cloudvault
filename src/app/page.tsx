import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Home from "~/components/home";

export default async function Root() {
    const { userId } = await auth();
    if (userId) redirect("/drive");
    return <Home />;
}

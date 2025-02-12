"use client";
import { useAuth } from "@clerk/nextjs";
import Home from "~/components/home";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "~/components/loader";

export default function Root() {
    const router = useRouter();
    const { userId, isLoaded } = useAuth();

    useEffect(() => {
        if (userId) {
            router.push("/drive");
        }
    }, [userId, router]);

    if (!isLoaded) {
        return <Loader />;
    }

    return !userId ? <Home /> : null;
}

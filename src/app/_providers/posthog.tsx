"use client";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { env } from "~/env";
import { useEffect } from "react";
import dynamicLoader from "next/dynamic";

const SuspendPostHogPageView = dynamicLoader(() => import("./pageviewTracker"), {
    ssr: false,
});

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
            api_host: "/ingest",
            ui_host: "https://us.posthog.com",
            capture_pageview: false,
        });
    }, []);

    return (
        <PHProvider client={posthog}>
            <SuspendPostHogPageView />
            {children}
        </PHProvider>
    );
}

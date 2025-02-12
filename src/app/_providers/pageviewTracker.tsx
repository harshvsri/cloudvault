"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { usePostHog } from "posthog-js/react";
import { useUser } from "@clerk/nextjs";

export default function PostHogPageView(): null {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const posthog = usePostHog();

    const { user } = useUser();
    useEffect(() => {
        if (user?.id) {
            posthog.identify(user.id, {
                email: user.emailAddresses[0]?.emailAddress,
            });
        } else {
            posthog.reset();
        }
    }, [posthog, user]);

    // Track pageviews
    useEffect(() => {
        if (pathname && posthog) {
            let url = window.origin + pathname;
            if (searchParams.toString()) {
                url = url + `?${searchParams.toString()}`;
            }

            posthog.capture("$pageview", { $current_url: url });
        }
    }, [pathname, searchParams, posthog]);

    return null;
}

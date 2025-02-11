import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { PostHogProvider } from "./_providers/posthog";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
    title: "CloudVault",
    description: "The cloud storage you wanted.",
    icons: [{ rel: "icon", url: "/cloudvault.png" }],
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <ClerkProvider>
            <html lang="en" className={`${GeistSans.variable}`}>
                <body>
                    <PostHogProvider>
                        {children}
                        <SpeedInsights />
                    </PostHogProvider>
                </body>
            </html>
        </ClerkProvider >
    );
}

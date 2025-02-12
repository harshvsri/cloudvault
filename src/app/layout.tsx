import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { PostHogProvider } from "./_providers/posthog";
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
    title: "CloudVault",
    description: "The cloud storage you wanted.",
    icons: [{ rel: "icon", url: "/cloudvault.png" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <html lang="en" className={`${GeistSans.variable}`}>
                <body className="min-h-screen bg-black text-white">
                    <PostHogProvider>{children}</PostHogProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}

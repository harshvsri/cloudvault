"use client";
import { Button } from "~/components/ui/button"
import { ArrowRight, Cloud, Lock, Zap } from "lucide-react"
import { SignedOut, SignInButton, useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
    const { userId } = useAuth();
    if (userId) {
        redirect("/drive");
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            <main className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-6">
                    CloudVault
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl mb-8 text-gray-300">Secure, Fast, and Reliable Cloud Storage</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <FeatureCard
                        icon={<Cloud className="h-10 w-10 text-blue-400" />}
                        title="Cloud-Native"
                        description="Built for the modern web with scalability in mind"
                    />
                    <FeatureCard
                        icon={<Lock className="h-10 w-10 text-blue-400" />}
                        title="Bank-Level Security"
                        description="Your data is encrypted and protected at all times"
                    />
                    <FeatureCard
                        icon={<Zap className="h-10 w-10 text-blue-400" />}
                        title="Lightning Fast"
                        description="Access your files instantly from anywhere"
                    />
                </div>

                <SignedOut>
                    <SignInButton forceRedirectUrl={"/drive"}>
                        <Button
                            size="lg"
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Get Started <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </SignInButton>
                </SignedOut>
            </main>
        </div >
    )
}

interface FeactureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string
};

function FeatureCard({ icon, title, description }: FeactureCardProps) {
    return (
        <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex justify-center mb-4">{icon}</div>
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-400">{description}</p>
        </div>
    )
}

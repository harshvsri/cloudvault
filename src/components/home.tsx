import { Button } from "~/components/ui/button";
import { ArrowRight, Cloud, Lock, Zap } from "lucide-react";
import { SignedOut, SignInButton } from "@clerk/nextjs";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-white sm:px-6 lg:px-8">
            <main className="mx-auto max-w-4xl py-5 text-center">
                <h1 className="mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl md:text-6xl">
                    CloudVault
                </h1>
                <p className="mb-8 text-xl text-gray-300 sm:text-2xl md:text-3xl">
                    Secure, Fast, and Reliable Cloud Storage
                </p>
                <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-3">
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
                            className="w-full bg-blue-600 text-white hover:bg-blue-700 sm:w-auto"
                        >
                            Get Started <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </SignInButton>
                </SignedOut>
            </main>
        </div>
    );
}

interface FeactureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function FeatureCard({ icon, title, description }: FeactureCardProps) {
    return (
        <div className="rounded-lg bg-gray-900 p-6">
            <div className="mb-4 flex justify-center">{icon}</div>
            <h2 className="mb-2 text-xl font-semibold">{title}</h2>
            <p className="text-gray-400">{description}</p>
        </div>
    );
}

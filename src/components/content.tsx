"use client";
import { ChevronRight } from "lucide-react";
import { FileRow, FolderRow } from "../components/row";
import type { DbFileType, DbFolderType } from "../server/db/schema";
import Link from "next/link";
import { SignedIn, useAuth, UserButton } from "@clerk/nextjs";
import { UploadButton } from "./uploadthing";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "./loader";

interface ContentProps {
    files: DbFileType[];
    folders: DbFolderType[];
    parents: DbFolderType[];
    folderId: number;
}

export default function DriveContent({ files, folders, parents, folderId }: ContentProps) {
    const router = useRouter();
    const { userId, isLoaded } = useAuth();

    useEffect(() => {
        if (!userId) {
            router.replace("/");
        }
    }, [userId, router]);

    if (!isLoaded) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-black p-8 text-white">
            <div className="mx-auto max-w-6xl">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center">
                        <Link href={"/drive"} className="mr-2 text-gray-300 hover:text-blue-400">
                            My Drive
                        </Link>

                        {/* Handling breadcrumbs */}
                        {parents.map((parent) => (
                            <div key={parent.id} className="flex items-center">
                                <ChevronRight className="mx-2 text-gray-500" size={16} />
                                <Link href={`/f/${parent.id}`} className="text-gray-300 hover:text-white">
                                    {parent.name}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Auth using clerk */}
                    <div>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>

                <div className="rounded-lg bg-black shadow-xl">
                    <div className="border-b border-gray-500 px-6 py-4">
                        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-white">
                            <div className="col-span-6">Name</div>
                            <div className="col-span-3">Size</div>
                            <div className="col-span-2">Type</div>
                            <div className="col-span-1"></div>
                        </div>
                    </div>
                    <ul>
                        {folders.map((folder) => (
                            <FolderRow key={folder.id} folder={folder} />
                        ))}
                        {files.map((file) => (
                            <FileRow key={file.id} file={file} />
                        ))}
                    </ul>
                </div>

                <UploadButton
                    className="mt-6"
                    endpoint={"driveVaultUploader"}
                    onClientUploadComplete={() => router.refresh()}
                    input={{ folderId }}
                />
            </div>
        </div>
    );
}

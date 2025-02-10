"use client";
import { ChevronRight } from "lucide-react"
import { FileRow, FolderRow } from '../components/row';
import type { DbFileType, DbFolderType } from "../server/db/schema";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "./uploadthing";
import { useRouter } from "next/navigation";

interface ContentProps {
    files: DbFileType[];
    folders: DbFolderType[];
    parents: DbFolderType[];
}

export default function DriveContent({ files, folders, parents }: ContentProps) {
    const navigate = useRouter();

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <Link
                            href={"/f/1"}
                            className="text-gray-300 hover:text-white mr-2"
                        >
                            My Drive
                        </Link>

                        {/* Handling breadcrumbs */}
                        {parents.map((parent) => (
                            <div key={parent.id} className="flex items-center">
                                <ChevronRight className="mx-2 text-gray-500" size={16} />
                                <Link
                                    href={`/f/${parent.id}`}
                                    className="text-gray-300 hover:text-white"
                                >
                                    {parent.name}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Auth using clerk */}
                    <div>
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg shadow-xl">
                    <div className="px-6 py-4 border-b border-gray-700">
                        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
                            <div className="col-span-6">Name</div>
                            <div className="col-span-3">Type</div>
                            <div className="col-span-3">Size</div>
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
                    endpoint={"imageUploader"}
                    onClientUploadComplete={() => {
                        navigate.refresh();
                    }}
                />
            </div>
        </div>
    )
}


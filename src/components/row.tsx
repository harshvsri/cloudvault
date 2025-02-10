import Link from 'next/link';
import { FileIcon, Folder } from 'lucide-react';
import type { DbFileType, DbFolderType } from "../server/db/schema";

interface FileRowProps {
    file: DbFileType
}

export const FileRow = ({ file }: FileRowProps) => {
    return (
        <li key={file.id} className="px-6 py-4 border-b border-gray-700 hover:bg-gray-750">
            <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-6 flex items-center">
                    <Link
                        href={file.url}
                        className="flex items-center text-gray-100 hover:text-blue-400"
                        target='_blank'
                    >
                        <FileIcon className="mr-3" size={20} />
                        {file.name}
                    </Link>
                </div>
                <div className="col-span-3 text-gray-400">File</div>
                <div className="col-span-3 text-gray-400">{file.size}</div>
            </div>
        </li>
    );
};



interface FolderRowProps {
    folder: DbFolderType
}

export const FolderRow = ({ folder }: FolderRowProps) => {
    return (
        <li key={folder.id} className="px-6 py-4 border-b border-gray-700 hover:bg-gray-750">
            <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-6 flex items-center">
                    <Link
                        href={`/f/${folder.id}`}
                        className="flex items-center text-gray-100 hover:text-blue-400"
                    >
                        <Folder className="mr-3" size={20} />
                        {folder.name}
                    </Link>
                </div>
                <div className="col-span-3 text-gray-400">Folder</div>
                <div className="col-span-3 text-gray-400">--</div>
            </div>
        </li >
    );
};

export type File = {
    id: string;
    name: string;
    url: string;
    parent: string;
    size: string;
}

export type Folder = {
    id: string;
    name: string;
    parent: string | null;
}

export const mockFiles: File[] = [
    {
        id: '1',
        name: 'file1.txt',
        url: '/mock-folder/file1.txt',
        parent: 'root',
        size: '15KB'
    },
    {
        id: '2',
        name: 'file2.txt',
        url: '/mock-folder/file2.txt',
        parent: 'folder1',
        size: '20KB'
    }
];

export const mockFolders: Folder[] = [
    {
        id: 'root',
        name: 'Mock Folder',
        parent: null
    },
    {
        id: 'folder1',
        name: 'Folder 1',
        parent: 'root'
    },
    {
        id: 'folder2',
        name: 'Folder 2',
        parent: 'folder1'
    }
];

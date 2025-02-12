import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatFileSize(sizeInBytes: number): string {
    if (sizeInBytes === 0) {
        return "0 B";
    }

    const sizeUnits = ["B", "KB", "MB", "GB", "TB", "PB"];
    let index = 0;
    let size = sizeInBytes;

    while (size >= 1000 && index < sizeUnits.length - 1) {
        size /= 1000;
        index++;
    }

    return `${size.toFixed(2)} ${sizeUnits[index]}`;
}

import { TriangleAlert } from "lucide-react";

interface ErrorDisplayProps {
    header?: string;
    message: string;
}

export function ErrorDisplay ({message, header}: ErrorDisplayProps) {
    return (
        <div className="flex flex-col justify-center bg-red-50 dark:bg-red-950 items-center gap-2 max-w-screen-sm mx-auto mt-10 mb-10 border border-red-500 rounded-lg p-4">
            <TriangleAlert className="w-14 h-14 text-red-500" />
            <h1 className="text-2xl font-semibold text-red-500">{header || "An Error Occurred"}</h1>
            <p className="text-center max-w-md text-muted-foreground dark:text-muted-foreground">{message}</p>
        </div>
    );
}

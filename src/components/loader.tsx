import { Loader2 } from "lucide-react";

export function Loader() {
    return (
        <div className="flex items-center justify-center">
            <Loader2 className="animate-spin w-10 h-10" />
        </div>
    )
}

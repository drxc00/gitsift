import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";


interface GithubStatsComponentProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    message?: string;
}

export function GithubStatsComponent({ title, value, icon, color, message }: GithubStatsComponentProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="border rounded-md p-4 flex items-center space-x-4 cursor-help">
                        <div className={`p-2 rounded-full ${color}`}>
                            {icon}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{title}</p>
                            <p className="text-xl font-semibold text-primary">{value}</p>
                        </div>
                    </div>
                </TooltipTrigger>
                {message && (
                    <TooltipContent>
                        <p className="text-sm">{message}</p>
                    </TooltipContent>
                )}
            </Tooltip>
        </TooltipProvider>
    );
}

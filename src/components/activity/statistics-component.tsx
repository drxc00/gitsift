import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { HelpCircle } from 'lucide-react'
import { TypeIcon as type, LucideIcon } from 'lucide-react'

interface GithubStatsComponentProps {
    title: string
    value: string | number
    icon: LucideIcon
    description?: string
    iconClassName?: string
}

export function GithubStatsComponent({ title, value, icon: Icon, description, iconClassName }: GithubStatsComponentProps) {
    return (
        <Card className="shadow-none rounded-md">
            <CardContent className="p-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-muted-foreground">{title}</p>
                            {description && (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <HelpCircle className="h-4 w-4 text-muted-foreground/50" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{description}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )}
                        </div>
                        <Icon className={cn("h-5 w-5 text-muted-foreground", iconClassName)} />
                    </div>
                    <div className="flex items-end justify-between">
                        <p className="text-xl font-semibold">{value}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


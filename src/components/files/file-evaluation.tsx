"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StatusItem } from "@/components/status-item";
import { CheckCircleIcon, FileIcon, CircleAlert, KeyRound, Settings, Lock } from "lucide-react";
import { RepoFiles } from "@/app/types";
import { useState } from "react";

export default function FileEvaluation({ data }: { data: RepoFiles }) {
    const { details } = data

    // Handle which files to show
    const [showFiles, setShowFiles] = useState<string | null>("Environment Files");

    const fileCategories = {
        // Regex patterns
        "Environment Files": /\.env(\.|$)/,
        "SSH Keys": /^id_rsa(\.pub)?$/,
        "Authentication Files": /^(\.htpasswd|auth\.json|credentials\.json|secret\.key)$/,
        "Configuration Files": /^(wp-config\.php|settings\.py)$/
    }

    const fileIcons = {
        "Environment Files": <Settings className="w-4 h-4" />,
        "SSH Keys": <KeyRound className="w-4 h-4" />,
        "Authentication Files": <Lock className="w-4 h-4" />,
        "Configuration Files": <Settings className="w-4 h-4" />
    }

    // Group critical files by category
    const groupedCriticalFiles = Object.entries(fileCategories).reduce((acc, [category, pattern]) => {
        const criticalInCategory = details.criticalFiles.filter(file => pattern.test(file));
        if (criticalInCategory.length > 0) {
            acc[category] = criticalInCategory;
        }
        return acc;
    }, {} as Record<string, string[]>);

    return (
        <div className="">
            <Card className="shadow-none rounded-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">
                        <div className="flex items-center justify-between">
                            <span>Overall File Evaluation</span>
                            <div className="flex items-center gap-2 text">
                                {Object.keys(groupedCriticalFiles).length > 0 ? (
                                    <Badge variant="outline" className="flex items-center gap-2 border-yellow-500 h-full">
                                        <CircleAlert className="w-3 h-3 text-yellow-500" />
                                        <span className="text-yellow-500 text-md hidden md:block">
                                            {Object.values(groupedCriticalFiles).flat().length} Critical Files Found
                                        </span>
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="flex items-center gap-2 border-green-500 h-full">
                                        <CheckCircleIcon className="w-3 h-3 text-green-500" />
                                        <span className="text-green-500 text-md hidden md:block">No Critical Files Found</span>
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
                        <div className="flex flex-col h-full">
                            <div className="h-full">
                                <div className="flex flex-col gap-2 justify-between h-full">
                                    {Object.entries(fileCategories).map(([category, files]) => {
                                        const criticalCount = groupedCriticalFiles[category]?.length || 0;
                                        return (
                                            <StatusItem
                                                key={category}
                                                label={`${category} ${criticalCount > 0 ? `(${criticalCount})` : ''}`}
                                                present={criticalCount === 0}
                                                className="cursor-pointer p-2 text-sm md:text-base border bg-background hover:bg-muted-foreground/10 transition-colors"
                                                onClick={() => setShowFiles(category)}
                                                icon={fileIcons[category as keyof typeof fileIcons]}
                                                isSelected={showFiles === category}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <ScrollArea className="h-[200px] p-2 border rounded-md flex flex-col">
                            <div className="space-y-2">
                                {groupedCriticalFiles[showFiles as keyof typeof groupedCriticalFiles]?.length > 0 ? (
                                    groupedCriticalFiles[showFiles as keyof typeof groupedCriticalFiles].map((file) => {
                                        const isCritical = details.criticalFiles.includes(file);
                                        return (
                                            <StatusItem
                                                key={file}
                                                label={file}
                                                present={!isCritical}
                                                icon={<FileIcon className="w-4 h-4 text-muted-foreground" />}
                                                className={`text-sm md:text-base ${isCritical ? 'text-red-500' : ''}`}
                                            />
                                        );
                                    })
                                ) : (
                                    <div className="text-muted-foreground text-sm">
                                        No files found in this category
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StatusItem } from "@/components/status-item";
import { CheckCircleIcon, FileIcon, CircleAlert, KeyRound, Settings, Lock } from "lucide-react";
import { RepoFiles } from "@/app/types";
import { useState } from "react";
import { Progress } from "../ui/progress";

export default function FileEvaluation({ data }: { data: RepoFiles }) {
    const { forbiddenFiles, details, fileScore } = data

    // Handle which files to show
    const [showFiles, setShowFiles] = useState<string | null>("Environment Files");

    const fileCategories = {
        "Environment Files": [".env", ".env.local", ".env.development", ".env.production", ".env.backup"],
        "SSH Keys": ["id_rsa", "id_rsa.pub"],
        "Authentication Files": [".htpasswd", "auth.json", "credentials.json", "secret.key"],
        "Configuration Files": ["wp-config.php", "settings.py"]
    }

    const fileIcons = {
        "Environment Files": <Settings className="w-4 h-4 text-muted-foreground" />,
        "SSH Keys": <KeyRound className="w-4 h-4 text-muted-foreground" />,
        "Authentication Files": <Lock className="w-4 h-4 text-muted-foreground" />,
        "Configuration Files": <Settings className="w-4 h-4 text-muted-foreground" />
    }

    return (
        <div className="">
            <Card className="shadow-none rounded-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">
                        <div className="flex items-center justify-between">
                            <span>Overall File Evaluation</span>
                            <div className="flex items-center gap-2 text">
                                {details.criticalFiles.length > 0 ? (
                                    <>
                                        <Badge variant="outline" className="flex items-center gap-2 border-yellow-500 h-full">
                                            <CircleAlert className="w-3 h-3 text-yellow-500" />
                                            <span className="text-yellow-500 text-md hidden md:block">Critical Files Found</span></Badge>
                                    </>
                                ) : (
                                    <>
                                        <Badge variant="outline" className="flex items-center gap-2 border-green-500 h-full">
                                            <CheckCircleIcon className="w-3 h-3 text-green-500" />
                                            <span className="text-green-500 text-md hidden md:block">No Critical Files Found</span></Badge>
                                    </>
                                )}
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <p className="text-sm text-muted-foreground">Overall File Score: {Math.round(fileScore)}%</p>
                        <Progress value={fileScore} className="w-full h-2 mb-4" indicatorColor={fileScore > 50 ? "bg-green-500" : "bg-yellow-500"} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
                        <div className="flex flex-col h-full py-4">
                            <div className="space-y-2 h-full">
                                <div className="flex flex-col gap-2 h-full">
                                    {Object.entries(fileCategories).map(([category, files]) => {
                                        const hasCriticalFiles = files.some(file =>
                                            details.criticalFiles.includes(file)
                                        );
                                        return (
                                            <StatusItem
                                                key={category}
                                                label={category}
                                                present={!hasCriticalFiles}
                                                className="cursor-pointer text-sm md:text-base"
                                                onClick={() => setShowFiles(category)}
                                                icon={fileIcons[category as keyof typeof fileIcons]}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <ScrollArea className="h-[200px] p-2 border rounded-md flex flex-col">
                            <div className="space-y-2">
                                {fileCategories[showFiles as keyof typeof fileCategories].map((file) => {
                                    const isCritical = details.criticalFiles.includes(file);
                                    return (
                                        <StatusItem
                                            key={file}
                                            label={file}
                                            present={!isCritical}
                                            icon={<FileIcon className="w-4 h-4 text-muted-foreground" />}
                                            className="text-sm md:text-base"
                                        />
                                    );
                                })}
                            </div>
                        </ScrollArea>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


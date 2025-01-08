"use client";

import { Badge } from "@/components/ui/badge";
import { EyeIcon, GitFork } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";
import { RepositoryData } from "@/app/types";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, GitBranch } from "lucide-react";

interface RepositoryInformationProps {
    data: RepositoryData;
}

interface LanguageBadgeProps {
    lang: {
        name: string;
        color?: string;
    };
}

function LanguageBadge({ lang }: LanguageBadgeProps) {
    const defaultColor = '#64748b';
    const hexColor = lang.color ? lang.color.replace('#', '') : defaultColor.replace('#', '');
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    const textColor = brightness > 125 ? 'black' : 'white';

    return (
        <Badge
            style={{
                backgroundColor: lang.color || defaultColor,
                color: textColor
            }}
            className="text-xs font-semibold rounded-lg"
        >
            {lang.name}
        </Badge>
    );
}

export function RepositoryInformation({ data }: RepositoryInformationProps) {
    const repo = data.repository;
    const [owner, repoName] = repo.nameWithOwner.split('/');

    return (
        <Card className="shadow-none rounded-md border-none">
            <CardContent className="p-0">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold flex items-center gap-2">
                                <Link href={`https://github.com/${owner}/${repoName}`} target="_blank" className="hover:underline">
                                    {owner}/<span className="text-green-500">{repoName}</span>
                                </Link>
                                {repo.isFork && (
                                    <Badge variant="outline" className="font-normal">
                                        Fork
                                    </Badge>
                                )}
                            </h1>
                            {repo.description && (
                                <p className="text-muted-foreground">
                                    {repo.description}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center md:justify-end gap-4">
                                <Badge variant="secondary" className="gap-2">
                                    <GitFork className="h-4 w-4" />
                                    {repo.forkCount.toLocaleString()}
                                </Badge>
                                <Badge variant="secondary" className="gap-2">
                                    <EyeIcon className="h-4 w-4" />
                                    {repo.watchers.totalCount.toLocaleString()}
                                </Badge>
                                <Badge variant="secondary" className="gap-2">
                                    ⭐ {repo.stargazerCount.toLocaleString()}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Created {new Date(repo.createdAt).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2">
                                    <GitBranch className="h-4 w-4" />
                                    Last updated {new Date(repo.updatedAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-start">
                        {repo.languages.nodes.length > 0 && (
                            <div className="flex gap-2 flex-wrap md:w-[40%] justify-start">
                                {repo.languages.nodes.slice(0, 10).map((lang) => (
                                    <LanguageBadge key={lang.name} lang={lang} />
                                ))}
                                {repo.languages.nodes.length > 10 && (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <span className="text-muted-foreground text-sm font-medium px-2 cursor-pointer hover:text-foreground transition-colors">
                                                +{repo.languages.nodes.length - 10} more
                                            </span>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto max-w-sm md:max-w-lg p-4">
                                            <div className="flex gap-2 flex-wrap">
                                                {repo.languages.nodes.slice(10).map((lang) => (
                                                    <LanguageBadge key={lang.name} lang={lang} />
                                                ))}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                )}
                            </div>
                        )}

                        {repo.repositoryTopics?.nodes && repo.repositoryTopics.nodes.length > 0 && (
                            <div className="flex gap-2 flex-wrap md:w-[40%] md:justify-end">
                                {repo.repositoryTopics.nodes.slice(0, 10).map((topic) => (
                                    <Badge variant="outline" className="text-muted-foreground" key={topic.topic.name}>
                                        {topic.topic.name}
                                    </Badge>
                                ))}
                                {repo.repositoryTopics.nodes.length > 10 && (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <span className="text-muted-foreground text-sm font-medium px-2 cursor-pointer hover:text-foreground transition-colors">
                                                +{repo.repositoryTopics.nodes.length - 10} more
                                            </span>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-2 max-w-sm md:max-w-lg">
                                            <div className="flex gap-2 flex-wrap">
                                                {repo.repositoryTopics.nodes.slice(10).map((topic) => (
                                                    <Badge variant="outline" className="text-muted-foreground" key={topic.topic.name}>
                                                        {topic.topic.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
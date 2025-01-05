"use client";

import { Badge } from "@/components/ui/badge";
import { EyeIcon, StarIcon, GitFork } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";
import { RepositoryData } from "@/app/types";

interface RepositoryInformationProps {
    data: RepositoryData;
}

export function RepositoryInformation({ data }: RepositoryInformationProps) {
    const repo = data.repository;

    const [owner, repoName] = repo.nameWithOwner.split('/');

    return (
        <div className="grid grid-cols-2 gap-6 p-6 justify-center rounded-lg border border-border w-full">
            <div>
                {/* Repository Name and Description */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold flex flex-row items-center gap-2">
                        <div className="flex flex-row items-center gap-2">
                            <Link href={`https://github.com/${owner}/${repoName}`} target="_blank" className="hover:underline flex text-primary flex-row items-center gap-1 transition-all">
                                <span className="text-primary/80">{owner}</span>/<span className="text-primary">{repoName}</span>
                            </Link>
                        </div>
                        {repo.isFork && (
                            <Badge variant="outline">
                                Fork
                            </Badge>
                        )}
                    </h1>
                    {repo.description && (
                        <p className="mt-4 text-muted-foreground max-w-lg text-clip-2">
                            {repo.description}
                        </p>
                    )}
                </div>
                {repo.languages.nodes.length > 0 && (
                    <div className="flex gap-2 flex-wrap overflow-clip">
                        {repo.languages.nodes.slice(0, 10).map((lang) => {
                            const defaultColor = '#64748b'; // A neutral gray color as fallback
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
                                    key={lang.name}>{lang.name}</Badge>
                            );
                        })}
                        {repo.languages.nodes.length > 10 && (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <span className="text-muted-foreground text-sm font-medium px-2 cursor-pointer hover:text-foreground transition-colors">
                                        +{repo.languages.nodes.length - 10} more
                                    </span>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto max-w-lg p-4">
                                    <div className="flex gap-2 flex-wrap">
                                        {repo.languages.nodes.slice(10).map((lang) => {
                                            const defaultColor = '#64748b'; // Same fallback color
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
                                                    key={lang.name}>{lang.name}</Badge>
                                            );
                                        })}
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                )}
            </div>
            <div>
                <div className="flex flex-wrap gap-4 mb-6 cursor-pointer font-semibold text-sm">
                    {/* Stars */}
                    <div className="flex flex-row items-center gap-2 rounded-lg bg-muted px-4 py-0.5">
                        <StarIcon className="w-4 h-4 text-yellow-500" fill="#eab308" />
                        <span>{repo.stargazerCount.toLocaleString()} stars</span>
                    </div>

                    {/* Forks */}
                    <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-0.5">
                        <GitFork className="w-4 h-4" />
                        <span>{repo.forkCount.toLocaleString()} forks</span>
                    </div>

                    {/* Watchers */}
                    <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-0.5">
                        <EyeIcon className="w-4 h-4" />
                        <span>{repo.watchers.totalCount.toLocaleString()} watching</span>
                    </div>
                </div>
                <div className="flex gap-2 text-muted-foreground text-sm">
                    <p>Created: {new Date(repo.createdAt).toLocaleDateString()}</p>
                    <p>Last updated: {new Date(repo.updatedAt).toLocaleDateString()}</p>
                </div>
                {repo.repositoryTopics?.nodes && repo.repositoryTopics?.nodes?.length > 0 ? (
                    <div className="flex gap-2 flex-wrap mt-4 text-sm capitalize">
                        {repo.repositoryTopics.nodes.slice(0, 10).map((topic) => (
                            <Badge variant="outline" className="text-muted-foreground" key={topic.topic.name}>{topic.topic.name}</Badge>
                        ))}
                        {repo.repositoryTopics.nodes.length > 10 && (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <span className="text-muted-foreground text-sm font-medium px-2 cursor-pointer hover:text-foreground transition-colors">
                                        +{repo.repositoryTopics.nodes.length - 10} more
                                    </span>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-2 max-w-lg">
                                    <div className="flex gap-2 flex-wrap">
                                        {repo.repositoryTopics.nodes.slice(10).map((topic) => (
                                            <Badge variant="outline" className="text-muted-foreground" key={topic.topic.name}>{topic.topic.name}</Badge>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                ) : (
                    <p className="text-muted-foreground">No topics found</p>
                )}
            </div>
        </div>
    );
}
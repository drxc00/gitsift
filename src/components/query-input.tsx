"use client";

import { FolderSearch, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const SAMPLE_REPOS = [
    { name: "GitSift", url: "https://github.com/drxc00/gitsift" },
    { name: "React", url: "https://github.com/facebook/react" },
    { name: "VS Code", url: "https://github.com/microsoft/vscode" },
    { name: "Angular", url: "https://github.com/angular/angular" },
    { name: "TensorFlow", url: "https://github.com/tensorflow/tensorflow" },
    { name: "Flutter", url: "https://github.com/flutter/flutter" },
    { name: "Next.js", url: "https://github.com/vercel/next.js" },
    { name: "Tailwind CSS", url: "https://github.com/tailwindlabs/tailwindcss" },
    { name: "Vue.js", url: "https://github.com/vuejs/vue" },
    { name: "Svelte", url: "https://github.com/sveltejs/svelte" },
    { name: "TypeScript", url: "https://github.com/microsoft/TypeScript" },
];

export function QueryInput() {

    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onClick = async () => {
        setLoading(true);
        // Regex to match GitHub repository URLs
        const githubRepoRegex = /^(https:\/\/)?github\.com\/([^\/]+)\/([^\/]+)\/?$/;
        // Test the query against the regex
        const match = url.match(githubRepoRegex);

        if (!match) {
            toast({
                title: "Invalid GitHub URL",
                description: "Please enter a valid GitHub repository URL",
                variant: "destructive",
            });
            setLoading(false);
            return;
        }
        // Extract the owner and repo name from the matched groups
        const [, , owner, repo] = match;
        // Redirect to the repo page or do something with the extracted data
        router.push(`/${owner}/${repo}`);
    }

    return (
        <div className="flex flex-col gap-4 mt-6 px-4 md:px-0 lg:px-0">
            <div className="flex flex-col gap-4 items-center max-w-2xl mx-auto w-full">
                <div className="flex flex-col md:flex-row w-full gap-2">
                    <Input
                        type="url"
                        placeholder="https://github.com/..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="h-12 bg-background shadow-none font-semibold"
                        height={48}
                    />
                    <Button className="px-8 h-12 font-bold bg-green-500 hover:bg-green-600" onClick={onClick}>
                        <span>
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                <div className="flex items-center justify-center gap-2 text-md">
                                    <FolderSearch />
                                    <span>Sift</span>
                                </div>
                            )}
                        </span>
                    </Button>
                </div>
            </div>
            <div className="text-center">
                <p className="text-sm text-muted-foreground">
                    Try out some examples
                </p>
            </div>
            <div className="flex gap-2 flex-wrap justify-center text-primary max-w-xl">
                {SAMPLE_REPOS.map((repo) => (
                    <Button key={repo.name} onClick={() => setUrl(repo.url)} variant="secondary" size="sm">
                        {repo.name}
                    </Button>
                ))}
            </div>
            <p className="text-xs text-muted-foreground text-center">
                You can also replace the &quot;hub&quot; in the GitHub URL with &quot;sift&quot; to use the tool.
            </p>
        </div>
    )
}
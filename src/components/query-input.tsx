"use client";

import { FolderSearch, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const SAMPLE_REPOS = [
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

    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onClick = async () => {
        setLoading(true);
        // Regex to match GitHub repository URLs
        const githubRepoRegex = /^(https:\/\/)?github\.com\/([^\/]+)\/([^\/]+)\/?$/;
        // Test the query against the regex
        const match = query.match(githubRepoRegex);

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
        <div className="flex flex-col gap-4">
            <div className="w-full max-w-xl flex gap-2 items-center mt-6">
                <Input placeholder="https://github.com/..." className="h-10" value={query} onChange={(e) => setQuery(e.target.value)} />
                <Button onClick={onClick} className="h-10" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FolderSearch />}
                </Button>
            </div>
            <div className="text-center">
                <p className="text-primary">Try out some examples</p>
            </div>
            <div className="flex gap-2 flex-wrap justify-center text-primary max-w-xl">
                {SAMPLE_REPOS.map((repo) => (
                    <Button key={repo.name} onClick={() => setQuery(repo.url)} variant="outline" size="sm">
                        {repo.name}
                    </Button>
                ))}
            </div>
        </div>
    )
}
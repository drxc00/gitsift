"use client";

import { use } from "react";
import { useQuery } from "react-query";
import { analyzeRepository } from "@/app/actions";
import StandardEvaluation from "@/components/standards/standard-evaluation";
import FileEvaluation from "@/components/files/file-evaluation";
import { RepositoryInformation } from "@/components/repository-summary";
import { Loader } from "@/components/loader";
import { CommunityCard } from "@/components/community/community-card";
import { InsightsCard } from "@/components/insights-card";
import { SiftedData, RepositoryData, RepoCommunityHealth, RepoStandard, RepoFiles } from "@/app/types";


export default function RepoPage({ params }: { params: Promise<{ gitUser: string, gitRepo: string }> }) {
    const { gitUser, gitRepo } = use(params);

    // Queries
    const { data: repoDataQuery, isError, isLoading, error } = useQuery(
        ['repoData', gitUser, gitRepo],
        async () => {
            const data = await analyzeRepository(gitUser, gitRepo);
            // If no data is found, throw an error
            if (!data) throw new Error("No data found");
            // Return the sifted data
            return data as SiftedData;
        },
        {
            staleTime: 1000 * 60 * 60, // Cache for 1 hour
            retry: false,
            cacheTime: 1000 * 60 * 60, // Cache for 1 hour
        }
    );


    if (isError) {
        return <div>Error: {error as string}</div>;
    }

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 z-50 bg-background">
                <Loader />
                <p className="text-lg text-muted-foreground">Sifting Repository</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 max-w-screen-xl mx-auto mt-4 mb-10">
            <div className="flex w-full">
                <RepositoryInformation data={repoDataQuery?.repo as RepositoryData} />
            </div>
            <div>
                <CommunityCard stats={repoDataQuery?.metrics.repoCommunityHealth as RepoCommunityHealth} />
            </div>
            <div>
                <StandardEvaluation repoStandard={repoDataQuery?.metrics.repoStandard as RepoStandard} />
            </div>
            <div>
                <FileEvaluation data={repoDataQuery?.metrics.repoFiles as RepoFiles} />
            </div>
            <div>
                <InsightsCard insights={[
                    ...(repoDataQuery?.metrics.repoStandard.details.insights || []),
                    ...(repoDataQuery?.metrics.repoFiles.details.insights || [])
                ]} />
            </div>
        </div>
    );
}
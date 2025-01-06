import { analyzeRepository } from "@/app/actions";
import StandardEvaluation from "@/components/standards/standard-evaluation";
import FileEvaluation from "@/components/files/file-evaluation";
import { RepositoryInformation } from "@/components/repository-summary";
import { CommunityCard } from "@/components/community/community-card";
import { InsightsCard } from "@/components/insights-card";
import { SiftedData, RepositoryData, RepoCommunityHealth, RepoStandard, RepoFiles } from "@/app/types";
import { unstable_cache as cache } from "next/cache"; // NOTE: This may be "unstable"
import { TriangleAlert } from "lucide-react";
import { ErrorDisplay } from "@/components/error";

const getRepoData = cache(async (gitUser: string, gitRepo: string) => {
    try {
        const repoDataQuery: SiftedData = await analyzeRepository(gitUser, gitRepo) as SiftedData;
        // Only cache successful responses
        if (repoDataQuery.status === "error") {
            throw new Error(repoDataQuery.error || "Repository not found");
        }
        return repoDataQuery as SiftedData;
    } catch (error) {
        // Don't cache errors, return them directly
        return {
            repo: null,
            error: error instanceof Error ? error.message : "Failed to fetch repository data",
            status: "error",
        } as SiftedData;
    }
}, ['repoData'], { revalidate: 60 * 60 * 1000 }); // Cache for 1 hour

export default async function RepoPage({ params }: { params: Promise<{ gitUser: string, gitRepo: string }> }) {
    const { gitUser, gitRepo } = await params;
    // Call server action
    const repoDataQuery: SiftedData = await getRepoData(gitUser, gitRepo) as SiftedData;

    // If the repo data query is an error, return an error message
    if (repoDataQuery.status === "error") {
        return <ErrorDisplay message={repoDataQuery.error as string} header="An Error Occurred" />
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
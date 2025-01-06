import { analyzeRepository } from "@/app/actions";
import StandardEvaluation from "@/components/standards/standard-evaluation";
import FileEvaluation from "@/components/files/file-evaluation";
import { RepositoryInformation } from "@/components/repository-summary";
import { CommunityCard } from "@/components/community/community-card";
import { InsightsCard } from "@/components/insights-card";
import { SiftedData, RepositoryData, RepoCommunityHealth, RepoStandard, RepoFiles } from "@/app/types";
import { unstable_cache as cache } from "next/cache"; // NOTE: This may be "unstable"

const getRepoData = cache(async (gitUser: string, gitRepo: string) => {
    const repoDataQuery: SiftedData = await analyzeRepository(gitUser, gitRepo) as SiftedData;
    return repoDataQuery;
}, ['repoData'], { revalidate: 60 * 60 * 1000 }); // Cache for 1 hour


export default async function RepoPage({ params }: { params: Promise<{ gitUser: string, gitRepo: string }> }) {
    const { gitUser, gitRepo } = await params;
    // Call server action
    const repoDataQuery: SiftedData = await getRepoData(gitUser, gitRepo) as SiftedData;
    // If no data is found, return an error
    if (!repoDataQuery) {
        return (
            <div className="flex flex-col justify-center items-center gap-6 max-w-screen-xl mx-auto mt-10 mb-10">
                <div className="flex flex-col gap-2">
                    <p className="text-center text-2xl font-semibold">Error: No data found</p>
                    <p className="text-center text-lg">Repository not found or not public.</p>
                </div>
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
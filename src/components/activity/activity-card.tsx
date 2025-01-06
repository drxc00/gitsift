import { RepoActivity } from "@/app/types";
import { GithubStatsComponent } from "@/components/activity/statistics-component";
import { CheckCheck, CircleAlert, CircleCheck, Clock, GitCommit, GitPullRequest, MessageCircle, Users } from "lucide-react";

// helper function to format time
const formatTime = (seconds: number): string => {
    const minutes = seconds / 60;
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days == 1) {
        return `${days} day`;
    } else if (days > 0) {
        return `${days} days`;
    } else if (hours > 0) {
        return `${hours} hours`;
    } else {
        return `${Math.round(minutes)} minutes`;
    }
};


export function ActivityCard({ stats }: { stats: RepoActivity }) {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <GithubStatsComponent
                    title="Total Issues"
                    value={stats.totalIssues.toLocaleString()}
                    icon={CircleAlert}
                    iconClassName="text-indigo-500"
                />
                <GithubStatsComponent
                    title="Open Issues"
                    value={stats.openIssues.toLocaleString()}
                    icon={CircleAlert}
                    iconClassName="text-red-500"
                />
                <GithubStatsComponent
                    title="Closed Issues"
                    value={stats.closedIssues.toLocaleString()}
                    icon={CircleCheck}
                    iconClassName="text-green-500"
                    />
                <GithubStatsComponent
                    title="Avg. Issue Close Time"
                    value={formatTime(stats.issueResponseTimeClosed)}
                    icon={Clock}
                    iconClassName="text-blue-500"
                    description="Calculated from the most recent ~10 issues, measuring the average time issues remain active from creation to either last update or closure."
                />
                <GithubStatsComponent
                    title="Avg. PR Merge Time"
                    value={formatTime(stats.prMergeTime)}
                    icon={GitPullRequest}
                    iconClassName="text-orange-500"
                    description="Based on the most recent ~10 pull requests, tracking the average time taken from creation to successful merge."
                />
                <GithubStatsComponent
                    title="Contributors"
                    value={stats.contributors.toLocaleString()}
                    icon={Users}
                    iconClassName="text-indigo-500"
                />
                <GithubStatsComponent
                    title="Issue Resolution Rate"
                    value={stats.issueResolutionRate.toFixed(2) + "%"}
                    icon={CheckCheck}
                    iconClassName="text-indigo-500"
                    description="The percentage of issues that are closed."
                />
                <GithubStatsComponent
                    title="Commit Interval"
                    value={formatTime(stats.commitInterval)}
                    icon={GitCommit}
                    iconClassName="text-indigo-500"
                    description="The average time between commits."
                />
            </div>
        </div>
    );
}

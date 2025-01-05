import { ResponseData, RepoCommunityHealth } from "@/app/types";

export interface CommunityHealthMetrics {
    totalIssues: number;
    openIssues: number;
    closedIssues: number;
    issueResponseTimeOpen: number;
    issueResponseTimeClosed: number;
    prMergeTime: number;
    contributors: number;
    issueResolutionRate: number;
    averagePRComments: number;
    activeContributorsRatio: number;
}

export interface OpenIssueNode {
    title: string;
    createdAt: string;
    updatedAt: string;
    comments: {
        totalCount: number;
    };
    labels: {
        nodes: Array<{
            name: string;
        }>;
    };
    assignees: {
        nodes: Array<unknown>; // Adjust if assignee structure is known
    };
    author: {
        login: string;
    }
}

export interface ClosedIssueNode {
    title: string;
    createdAt: string;
    closedAt: string;
    comments: {
        totalCount: number;
    };
}

export interface PullRequestNode {
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    mergedAt: string | null;
    state: string;
    comments: {
        totalCount: number;
    };
}

export interface DiscussionNode {
    createdAt: string;
    comments: {
        totalCount: number;
    };
}

export class CommunityHealthEvaluator {
    private repoData: ResponseData;

    constructor(repoData: ResponseData) {
        this.repoData = repoData;
    }

    public async getMetrics(): Promise<CommunityHealthMetrics> {
        const repository = this.repoData.repo.repository;
        const openIssues = repository.openIssues.nodes as OpenIssueNode[];
        const closedIssues = repository.closedIssues.nodes as ClosedIssueNode[];
        const prs = repository.pullRequests.nodes as PullRequestNode[];
        const contributors = repository.contributors || [];
        const totalIssues = repository.openIssues.totalCount + repository.closedIssues.totalCount;

        const { issueResponseTimeOpen, issueResponseTimeClosed } = this.calculateAverageResponseTime(openIssues, closedIssues);
        const prMergeTime = this.calculateAverageMergeTime(prs);

        return {
            totalIssues,
            openIssues: repository.openIssues.totalCount,
            closedIssues: repository.closedIssues.totalCount,
            issueResponseTimeOpen: issueResponseTimeOpen / 1000,
            issueResponseTimeClosed: issueResponseTimeClosed / 1000,
            prMergeTime: prMergeTime / 1000,
            contributors: contributors.totalCount,
            issueResolutionRate: totalIssues > 0 ? (repository.closedIssues.totalCount / totalIssues) * 100 : 0,
            averagePRComments: this.calculateAveragePRComments(prs),
            activeContributorsRatio: totalIssues > 0 ? contributors.totalCount / totalIssues : 0,
        } as RepoCommunityHealth;
    }

    private calculateAverageResponseTime(openIssues: OpenIssueNode[], closedIssues: ClosedIssueNode[]): { issueResponseTimeOpen: number, issueResponseTimeClosed: number } {
        let issueResponseTimeOpen = 0;
        let issueResponseTimeClosed = 0;

        if (openIssues.length > 0) {
            const totalResponseTimeOpenIssues = openIssues.reduce((sum, issue) => {
                const createdAt = new Date(issue.createdAt).getTime();
                const updatedAt = new Date(issue.updatedAt).getTime();
                return sum + (updatedAt - createdAt);
            }, 0);
            issueResponseTimeOpen = totalResponseTimeOpenIssues / openIssues.length;
        }

        if (closedIssues.length > 0) {
            const totalResponseTimeClosedIssues = closedIssues.reduce((sum, issue) => {
                const createdAt = new Date(issue.createdAt).getTime();
                const closedAt = new Date(issue.closedAt).getTime();
                return sum + (closedAt - createdAt);
            }, 0);
            issueResponseTimeClosed = totalResponseTimeClosedIssues / closedIssues.length;
        }

        return {
            issueResponseTimeOpen,
            issueResponseTimeClosed,
        };
    }

    private calculateAverageMergeTime(prs: PullRequestNode[]): number {
        const mergedPRs = prs.filter(pr => pr.mergedAt !== null);
        if (mergedPRs.length === 0) return 0;

        const totalMergeTime = mergedPRs.reduce((sum, pr) => {
            const createdAt = new Date(pr.createdAt).getTime();
            const mergedAt = new Date(pr.mergedAt!).getTime();
            return sum + (mergedAt - createdAt);
        }, 0);

        return totalMergeTime / mergedPRs.length;
    }

    private calculateAveragePRComments(prs: PullRequestNode[]): number {
        if (prs.length === 0) return 0;
        const totalComments = prs.reduce((sum, pr) => sum + pr.comments.totalCount, 0);
        return totalComments / prs.length;
    }
}
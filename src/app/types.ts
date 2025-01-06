export type SiftedData = {
    repo: RepositoryData | null;
    metrics: Metrics;
    error?: string;
    status?: "success" | "error";
}

export type StandardScoring = {
    present: boolean;
    weight: number;
}

export type RepoStandard = {
    standardScore: number;
    standardFiles: Record<string, boolean>;
    standardSetup: {
        license: StandardScoring;
        codeOfConduct: StandardScoring;
        issueTemplate: StandardScoring;
        securityPolicy: StandardScoring;
        hasTags: StandardScoring;
        hasBranchProtection: StandardScoring;
        hasContributionGuidelines: StandardScoring;
        hasVulnerabilityAlerts: StandardScoring;
    };
    details: {
        fileScore: number;
        setupScore: number;
        missingCritical: string[];
        insights: string[];
    };
}

export type RepoFiles = {
    fileScore: number;
    forbiddenFiles: Record<string, boolean>;
    details: {
        criticalFiles: string[];
        insights: string[];
    };
}

export type RepoActivity = {
    commitInterval: number;
    totalIssues: number;
    openIssues: number;
    closedIssues: number;
    issueResponseTimeOpen: number;
    issueResponseTimeClosed: number;
    prMergeTime: number;
    contributors: number;
    issueResolutionRate: number;
    activeContributorsRatio: number;
}

export type Metrics = {
    repoStandard: RepoStandard;
    repoFiles: RepoFiles;
    repoActivity: RepoActivity;
}

export type RepositoryData = {
    repository: {
        name: string;
        description: string;
        nameWithOwner: string;
        defaultBranchRef: { name: string };
        url: string;
        createdAt: string;
        updatedAt: string;
        pushedAt: string;
        stargazerCount: number;
        forkCount: number;
        primaryLanguage: {
            name: string;
            color: string;
        };
        languages: {
            totalCount: number;
            nodes: Array<{
                name: string;
                color: string;
            }>;
        };
        watchers: {
            totalCount: number;
        };
        openIssues: {
            totalCount: number;
            nodes: Array<{
                createdAt: string;
                updatedAt: string;
            }>;
        };
        closedIssues: {
            totalCount: number;
            nodes: Array<{
                createdAt: string;
                closedAt: string;
            }>;
        };
        pullRequests: {
            totalCount: number;
            nodes: Array<{
                createdAt: string;
                updatedAt: string;
                mergedAt: string | null;
                state: string;
            }>;
        };
        isFork: boolean;
        forks: {
            totalCount: number;
        };
        commits?: {
            history: {
                edges: Array<{
                    node: {
                        committedDate: string;
                    };
                }>;
            };
        };
        codeOfConduct: {
            key: string;
            name: string;
            url: string;
        } | null;
        issueTemplates: Array<unknown> | null;
        repositoryTopics: {
            nodes: Array<{
                topic: {
                    name: string;
                };
            }>;
        } | null;
        licenseInfo: {
            body: string;
            description: string;
        } | null;
        securityPolicyUrl: string | null;
        hasVulnerabilityAlertsEnabled: boolean;
        branchProtectionRules: {
            nodes: Array<{
                pattern: string;
                id: string;
            }> | null;
        };
        contributingGuidelines: {
            body: string;
        } | null;
        contributors: {
            totalCount: number;
        };
    };
}

export type GitTree = {
    sha: string;
    url: string;
    tree: GitTreeItem[];
}

export type GitTreeItem = {
    path: string;
    mode: string;
    type: string;
    sha: string;
    size: number;
    url: string;
}

export type ParseTreeItem = {
    name: string;
    type: string;
    path: string;
    children?: Record<string, ParseTreeItem>;
    mode: string;
    sha: string;
    size?: number;
    url: string;
}

export type ParsedTree = {
    [key: string]: ParseTreeItem;
}

export type ResponseData = {
    repo: RepositoryData;
    tree: ParsedTree;
}

export type CommitAuthorDetails = {
    name: string;
    email: string;
    date: string;
}

export type CommitTree = {
    sha: string;
    url: string;
}
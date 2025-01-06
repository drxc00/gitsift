import { ResponseData, ParseTreeItem } from "@/app/types";


export class StandardEvaluator {
    private repoData: ResponseData;
    private standardFiles: Array<{
        name: string;
        weight: number;
        required: boolean;
    }> = [
            { name: '.gitignore', weight: 30, required: true },
            { name: 'README.md', weight: 30, required: true },
            { name: 'LICENSE', weight: 20, required: true },
            { name: 'PULL_REQUEST_TEMPLATE.md', weight: 5, required: false },
        ];

    // Enhanced metrics with weights
    private repoStandard: {
        standardScore: number;
        standardFiles: Record<string, boolean>;
        standardSetup: {
            license: { present: boolean; weight: number };
            codeOfConduct: { present: boolean; weight: number };
            issueTemplate: { present: boolean; weight: number };
            securityPolicy: { present: boolean; weight: number };
            hasTags: { present: boolean; weight: number };
            hasBranchProtection: { present: boolean; weight: number };
            hasContributionGuidelines: { present: boolean; weight: number };
            hasVulnerabilityAlerts: { present: boolean; weight: number };
        };
        details: {
            fileScore: number;
            setupScore: number;
            missingCritical: string[];
            insights: string[];
        };
    };

    constructor(repoData: ResponseData) {
        this.repoData = repoData;
        this.repoStandard = this.initializeRepoStandard();
    }

    private initializeRepoStandard() {
        return {
            standardScore: 0,
            standardFiles: this.standardFiles.reduce((acc, file) => {
                acc[file.name] = false;
                return acc;
            }, {} as Record<string, boolean>),
            standardSetup: {
                license: { present: false, weight: 20 },
                codeOfConduct: { present: false, weight: 15 },
                issueTemplate: { present: false, weight: 10 },
                securityPolicy: { present: false, weight: 15 },
                hasTags: { present: false, weight: 5 },
                hasBranchProtection: { present: false, weight: 5 },
                hasContributionGuidelines: { present: false, weight: 15 },
                hasVulnerabilityAlerts: { present: false, weight: 15 },
            },
            details: {
                fileScore: 0,
                setupScore: 0,
                missingCritical: [],
                insights: [],
            },
        };
    }

    private traverseTree(tree: ParseTreeItem, referenceFiles: Array<{ name: string; weight: number; required: boolean }>): ParseTreeItem[] {
        const referenceFilesFound: ParseTreeItem[] = [];

        const classifyFile = (node: ParseTreeItem) => {
            if (node.name && referenceFiles.some(file => file.name === node.name)) {
                referenceFilesFound.push(node);
            }
        };

        const traverse = (node: ParseTreeItem) => {
            if (node.type !== 'tree') {
                classifyFile(node);
            }

            if (node.children) {
                Object.values(node.children).forEach(traverse);
            }
        };

        traverse(tree);
        return referenceFilesFound;
    }

    private async evaluateRepoStandard() {
        const requiredFilesFound: ParseTreeItem[] = [];

        // Traverse repo data tree
        Object.values(this.repoData.tree).forEach(item => {
            const standardFilesFound = this.traverseTree(item, this.standardFiles);
            requiredFilesFound.push(...standardFilesFound);
        });

        // Find missing essential files
        const missingFiles = this.findMissingFiles(requiredFilesFound);
        this.updateStandardFiles(requiredFilesFound, missingFiles);

        // Check for additional documentation
        this.checkStandardDocs();

        // Calculate scores and generate insights
        this.calculateScores();
        this.generateInsights();
    }

    private findMissingFiles(requiredFilesFound: ParseTreeItem[]) {
        return this.standardFiles.filter(file =>
            !requiredFilesFound.some(foundFile => foundFile.name === file.name)
        );
    }

    private calculateScores() {
        // Calculate file score
        const fileScore = this.standardFiles.reduce((score, file) => {
            if (this.repoStandard.standardFiles[file.name]) {
                score += file.weight;
            } else if (file.required) {
                this.repoStandard.details.missingCritical.push(file.name);
            }
            return score;
        }, 0);

        // Calculate setup score
        const setupScore = Object.entries(this.repoStandard.standardSetup).reduce((score, [, value]) => {
            if (value.present) {
                score += value.weight;
            }
            return score;
        }, 0);

        // Calculate total scores
        const maxFileScore = this.standardFiles.reduce((sum, file) => sum + file.weight, 0);
        const maxSetupScore = Object.values(this.repoStandard.standardSetup)
            .reduce((sum, item) => sum + item.weight, 0);

        this.repoStandard.details.fileScore = (fileScore / maxFileScore) * 100;
        this.repoStandard.details.setupScore = (setupScore / maxSetupScore) * 100;

        // Calculate final score with penalties for missing critical items
        const baseScore = (this.repoStandard.details.fileScore * 0.6) +
            (this.repoStandard.details.setupScore * 0.4);

        // Apply penalties for missing critical files
        const criticalPenalty = this.repoStandard.details.missingCritical.length * 15;

        // Calculate final score with minimum of 0
        this.repoStandard.standardScore = Math.max(0, Math.round(baseScore - criticalPenalty));
    }

    private generateInsights() {
        const insights: string[] = [];

        // Check for missing critical files
        this.repoStandard.details.missingCritical.forEach(file => {
            insights.push(`Add ${file} to meet basic repository standards`);
        });

        // Check security setup
        if (!this.repoStandard.standardSetup.securityPolicy.present) {
            insights.push('Add a security policy to handle vulnerability reports');
        }
        if (!this.repoStandard.standardSetup.hasBranchProtection.present) {
            insights.push('Enable branch protection rules for main/master branch if possible');
        }

        // Check documentation
        if (!this.repoStandard.standardSetup.codeOfConduct.present) {
            insights.push('Add a code of conduct to set community guidelines');
        }
        if (!this.repoStandard.standardSetup.hasContributionGuidelines.present) {
            insights.push('Add contribution guidelines to help new contributors');
        }

        this.repoStandard.details.insights = insights;
    }

    private updateStandardFiles(requiredFilesFound: ParseTreeItem[], missingFiles: Array<{ name: string; weight: number; required: boolean }>) {
        requiredFilesFound.forEach(file => {
            if (file.name) {
                this.repoStandard.standardFiles[file.name] = true;
            }
        });
        missingFiles.forEach(file => {
            this.repoStandard.standardFiles[file.name] = false;
        });
    }

    private checkStandardDocs() {
        const repo = this.repoData.repo.repository;

        // Check for each doc type with more detailed validation
        this.repoStandard.standardSetup.license.present = !!repo.licenseInfo;
        this.repoStandard.standardSetup.codeOfConduct.present = !!repo.codeOfConduct;
        this.repoStandard.standardSetup.issueTemplate.present = !!(repo.issueTemplates && repo.issueTemplates.length > 0);
        this.repoStandard.standardSetup.securityPolicy.present = !!repo.securityPolicyUrl;
        this.repoStandard.standardSetup.hasTags.present = !!(repo.repositoryTopics && repo.repositoryTopics.nodes.length > 0);
        this.repoStandard.standardSetup.hasBranchProtection.present = !!(repo.branchProtectionRules.nodes && repo.branchProtectionRules.nodes.length > 0);
        this.repoStandard.standardSetup.hasContributionGuidelines.present = !!repo.contributingGuidelines;
        this.repoStandard.standardSetup.hasVulnerabilityAlerts.present = !!(repo.hasVulnerabilityAlertsEnabled);
    }

    public async getMetrics() {
        await this.evaluateRepoStandard();
        return this.repoStandard;
    }
}
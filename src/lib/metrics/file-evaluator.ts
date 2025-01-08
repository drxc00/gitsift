import { ResponseData, ParseTreeItem } from "@/app/types";

export class FileEvaluator {
    private repoData: ResponseData;
    private forbiddenFiles: Array<{
        pattern: string | RegExp;
        weight: number;
        isCritical: boolean;
    }> = [
            // Environment Files
            { pattern: /\.env(\.|$)/, weight: 30, isCritical: true },
            { pattern: /\.env\.(local|development|production|backup)$/, weight: 30, isCritical: true },

            // SSH Keys
            { pattern: /id_rsa$/, weight: 30, isCritical: true },
            { pattern: /id_rsa\.pub$/, weight: 20, isCritical: true },

            // Authentication Files
            { pattern: /\.htpasswd$/, weight: 25, isCritical: true },
            { pattern: /auth\.json$/, weight: 25, isCritical: true },
            { pattern: /credentials\.json$/, weight: 25, isCritical: true },
            { pattern: /secret\.key$/, weight: 25, isCritical: true },

            // Configuration Files
            { pattern: /wp-config\.php$/, weight: 25, isCritical: true },
            { pattern: /settings\.py$/, weight: 15, isCritical: true }
        ];
    private repoFiles: {
        forbiddenFiles: Record<string, boolean>;
        details: {
            criticalFiles: string[];
            insights: string[];
        };
    };

    constructor(repoData: ResponseData) {
        this.repoData = repoData;
        this.repoFiles = this.initializeRepoFiles();
    }

    private initializeRepoFiles() {
        return {
            fileScore: 0,
            forbiddenFiles: this.forbiddenFiles.reduce((acc, file) => {
                acc[file.pattern.toString()] = false;
                return acc;
            }, {} as Record<string, boolean>),
            details: {
                criticalFiles: [],
                insights: [],
            },
        }
    }

    private async evaluateFiles() {
        const forbiddenFilesFound: ParseTreeItem[] = [];

        Object.values(this.repoData.tree).forEach(item => {
            const standardFilesFound = this.traverseTree(item, this.forbiddenFiles);
            forbiddenFilesFound.push(...standardFilesFound);
        });

        const criticalFiles = this.findCriticalFiles(forbiddenFilesFound);
        this.repoFiles.details.criticalFiles = Array.from(criticalFiles);
        this.generateInsights();
    }

    private findCriticalFiles(forbiddenFilesFound: ParseTreeItem[]) {
        const criticalFiles = forbiddenFilesFound.filter(foundFile => {
            return this.forbiddenFiles.some(file => {
                const pattern = typeof file.pattern === 'string' ?
                    new RegExp(file.pattern) :
                    file.pattern;
                return pattern.test(foundFile.name) && file.isCritical;
            });
        }).map(foundFile => foundFile.name); // Map the found files to their names

        return new Set(criticalFiles);
    }

    private generateInsights() {
        const criticalFiles = this.repoFiles.details.criticalFiles;
        const insights = criticalFiles.map(file => `Remove ${file} if possible`);
        this.repoFiles.details.insights = insights;
    }

    private traverseTree(tree: ParseTreeItem, referenceFiles: Array<{ pattern: string | RegExp; weight: number; isCritical: boolean }>): ParseTreeItem[] {
        const referenceFilesFound: ParseTreeItem[] = [];

        const classifyFile = (node: ParseTreeItem) => {
            if (node.name && referenceFiles.some(file => {
                if (typeof file.pattern === 'string') {
                    return node.name === file.pattern;
                } else {
                    return file.pattern.test(node.name);
                }
            })) {
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

    public async getMetrics() {
        await this.evaluateFiles();
        return this.repoFiles;
    }
}
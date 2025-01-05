import { ResponseData, ParseTreeItem } from "@/app/types";

export class FileEvaluator {
    private repoData: ResponseData;
    private forbiddenFiles: Array<{
        name: string;
        weight: number;
        isCritical: boolean;
    }> = [
            // Authentication and Keys
            { name: '.env', weight: 30, isCritical: true },
            { name: '.env.local', weight: 30, isCritical: true },
            { name: '.env.development', weight: 25, isCritical: true },
            { name: '.env.production', weight: 30, isCritical: true },
            { name: '.env.backup', weight: 30, isCritical: true },
            { name: 'id_rsa', weight: 30, isCritical: true },
            { name: 'id_rsa.pub', weight: 20, isCritical: true },
            { name: '.htpasswd', weight: 25, isCritical: true },
            { name: 'auth.json', weight: 25, isCritical: true },
            { name: 'credentials.json', weight: 25, isCritical: true },
            { name: 'secret.key', weight: 25, isCritical: true },

            // Configuration Files with Sensitive Data
            { name: 'config.php', weight: 20, isCritical: true },
            { name: 'wp-config.php', weight: 25, isCritical: true },
            { name: 'database.yml', weight: 20, isCritical: true },
            { name: 'settings.py', weight: 15, isCritical: true },
            { name: 'configuration.php', weight: 15, isCritical: true },

            // Database Files
            { name: '.sqlite', weight: 20, isCritical: true },
            { name: '.sqlite3', weight: 20, isCritical: true },
            { name: '.mdb', weight: 20, isCritical: true },
            { name: 'dump.sql', weight: 20, isCritical: true },
            { name: 'database.sql', weight: 20, isCritical: true },

            // Log Files
            { name: '.log', weight: 15, isCritical: false },
            { name: 'error.log', weight: 15, isCritical: false },
            { name: 'debug.log', weight: 15, isCritical: false },
            { name: 'npm-debug.log', weight: 10, isCritical: false },

            // Cache and Temporary Files
            { name: '.DS_Store', weight: 5, isCritical: false },
            { name: 'Thumbs.db', weight: 5, isCritical: false },
            { name: '.sass-cache', weight: 5, isCritical: false },
            { name: '.idea/', weight: 5, isCritical: false },
            { name: '.vscode/', weight: 5, isCritical: false },

            // Package Lock Files (depends on project)
            { name: 'yarn.lock', weight: 10, isCritical: false },
            { name: 'package-lock.json', weight: 10, isCritical: false },

            // Build and Distribution
            { name: 'dist/', weight: 10, isCritical: false },
            { name: 'build/', weight: 10, isCritical: false },
            { name: 'node_modules/', weight: 15, isCritical: false },

            // AWS Specific
            { name: 'aws.config', weight: 25, isCritical: true },
            { name: 'credentials.csv', weight: 25, isCritical: true },
            { name: '.aws/credentials', weight: 25, isCritical: true },

            // Certificate Files
            { name: '.pfx', weight: 20, isCritical: true },
            { name: '.crt', weight: 20, isCritical: true },
            { name: '.cer', weight: 20, isCritical: true },
            { name: '.pem', weight: 20, isCritical: true },
            { name: '.p12', weight: 20, isCritical: true },

            // Backup Files
            { name: '.bak', weight: 15, isCritical: false },
            { name: '.swp', weight: 10, isCritical: false },
            { name: '~', weight: 10, isCritical: false },
            { name: '.old', weight: 10, isCritical: false }
        ];
    private repoFiles: {
        fileScore: number;
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
                acc[file.name] = false;
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
        this.repoFiles.fileScore = this.calculateScores(criticalFiles);
        this.repoFiles.details.criticalFiles = criticalFiles;
        this.generateInsights();
    }

    private findCriticalFiles(forbiddenFilesFound: ParseTreeItem[]) {
        return this.forbiddenFiles.filter(file =>
            forbiddenFilesFound.some(foundFile => foundFile.name === file.name && file.isCritical)
        ).map(file => file.name);
    }

    private calculateScores(criticalFiles: string[]) {
        const criticalPenalty = criticalFiles.reduce((penalty, file) => {
            penalty += this.forbiddenFiles.find(f => f.name === file)?.weight || 0;
            return penalty;
        }, 0);

        const maxScore = this.forbiddenFiles.reduce((sum, file) => sum + file.weight, 0);
        const baseScore = (maxScore - criticalPenalty) / maxScore;
        return Math.max(0, Math.round(baseScore * 100));
    }

    private generateInsights() {
        const criticalFiles = this.repoFiles.details.criticalFiles;
        const insights = criticalFiles.map(file => `Remove ${file} if possible`);
        this.repoFiles.details.insights = insights;
    }

    private traverseTree(tree: ParseTreeItem, referenceFiles: Array<{ name: string; weight: number; isCritical: boolean }>): ParseTreeItem[] {
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

    public async getMetrics() {
        await this.evaluateFiles();
        return this.repoFiles;
    }
}
import { CommunityHealthEvaluator } from './community-health';
import { FileEvaluator } from './file-evaluator';
import { StandardEvaluator } from './standard-evaluator';
import { ResponseData } from '@/app/types';
export class Evaluator {
    private repoStandardEvaluator: StandardEvaluator;
    private repoFileEvaluator: FileEvaluator;
    private repoCommunityHealthEvaluator: CommunityHealthEvaluator;
    constructor(repoData: ResponseData) {
        this.repoStandardEvaluator = new StandardEvaluator(repoData)
        this.repoFileEvaluator = new FileEvaluator(repoData)
        this.repoCommunityHealthEvaluator = new CommunityHealthEvaluator(repoData)
    }
    public async getMetrics() {
        return {
            repoStandard: await this.repoStandardEvaluator.getMetrics(),
            repoFiles: await this.repoFileEvaluator.getMetrics(),
            repoCommunityHealth: await this.repoCommunityHealthEvaluator.getMetrics(),
        };
    }
}

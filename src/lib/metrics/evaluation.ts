import { FileEvaluator } from './file-evaluator';
import { StandardEvaluator } from './standard-evaluator';
import { ResponseData } from '@/app/types';
import { ActivityEvaluator } from './repo-activity';

export class Evaluator {
    private repoStandardEvaluator: StandardEvaluator;
    private repoFileEvaluator: FileEvaluator;
    private repoActivityEvaluator: ActivityEvaluator;
    constructor(repoData: ResponseData) {
        this.repoStandardEvaluator = new StandardEvaluator(repoData)
        this.repoFileEvaluator = new FileEvaluator(repoData)
        this.repoActivityEvaluator = new ActivityEvaluator(repoData)
    }
    public async getMetrics() {
        return {
            repoStandard: await this.repoStandardEvaluator.getMetrics(),
            repoFiles: await this.repoFileEvaluator.getMetrics(),
            repoActivity: await this.repoActivityEvaluator.getMetrics(),
        };
    }
}

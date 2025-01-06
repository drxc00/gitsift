"use server";
import { fetchRepoData } from "@/lib/github";
import { Evaluator } from "@/lib/metrics/evaluation";
import { SiftedData, ResponseData } from "./types";

export async function analyzeRepository(user: string, repo: string): Promise<SiftedData | null> {
    try {

        // Fetch fresh data
        const responseData = await fetchRepoData(user, repo);
        const evaluate = new Evaluator(responseData as ResponseData);

        const siftedData: SiftedData = {
            repo: responseData.repo,
            metrics: await evaluate.getMetrics(),
        };

        return siftedData as SiftedData;
    } catch (error) {
        console.error(error);
        return null;
    }
}

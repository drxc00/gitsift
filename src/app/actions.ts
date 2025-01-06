"use server";
import { fetchRepoData } from "@/lib/github";
import { Evaluator } from "@/lib/metrics/evaluation";
import { SiftedData, ResponseData } from "./types";

export async function analyzeRepository(user: string, repo: string): Promise<SiftedData> {
    try {
        // Validate the parameters
        if (!user || !repo) throw new Error("Please provide both a github user and repository.");

        // Fetch fresh data with timeout
        // The race is used to prevent the server from hanging if the request takes too long
        const responseData = await Promise.race([
            fetchRepoData(user, repo),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Request timed out.")), 10000) // 10 second timeout
            )
        ]) as ResponseData;

        // Check if the there is a response repo
        if (!responseData.repo || !responseData.tree) throw new Error("Failed to fetch repository data.");

        // Evaluate the repository
        const evaluate = new Evaluator(responseData);

        const siftedData: SiftedData = {
            repo: responseData.repo,
            metrics: await evaluate.getMetrics(),
            status: "success",
        };

        return siftedData;
    } catch (error) {
        return {
            repo: null,
            error: error instanceof Error ? error.message : "An unknown error occurred.",
            status: "error",
        } as SiftedData;
    }
}

"use server";
import { fetchRepoData } from "@/lib/github";
import { Evaluator } from "@/lib/metrics/evaluation";
import { getCacheKey, redis } from "@/lib/redis";
import { SiftedData, ResponseData } from "./types";

export async function analyzeRepository(user: string, repo: string): Promise<SiftedData | null> {
    try {
        // Check if the data is cached
        // If it is, return the cached data
        const cacheKey = getCacheKey(user, repo);
        const cached: { data: SiftedData; timestamp: number } | null = await redis.get(cacheKey);

        // If cached data exists
        if (cached) {
            // Check if cache has timestamp and is fresh (less than 1 hour old)
            if (cached.timestamp && (Date.now() - cached.timestamp) < 60 * 60 * 1000) {
                return cached.data as SiftedData;
            }
        }

        // Fetch fresh data
        const responseData = await fetchRepoData(user, repo);
        const evaluate = new Evaluator(responseData as ResponseData);

        const siftedData: SiftedData = {
            repo: responseData.repo,
            metrics: await evaluate.getMetrics(),
        };

        // Cache with timestamp
        await redis.set(cacheKey, JSON.stringify({
            data: siftedData,
            timestamp: Date.now()  // Add current timestamp
        }), { ex: 60 * 60 }); // Cache for 1 hour

        return siftedData;
    } catch (error) {
        console.error(error);
        return null;
    }
}

import { Redis } from "@upstash/redis";

export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL as string,
    token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
})
// Helper function to generate a cache key
export const getCacheKey = (user: string, repo: string) => `repo:${user}:${repo}`;

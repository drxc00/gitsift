import { graphql } from "@octokit/graphql";
import { ParseTree } from "./parser";
import { gqlQuery } from "./query";
import { ResponseData, RepositoryData } from "@/app/types";


const GITHUB_HEADERS = {
    headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`,
    }
}
const GITHUB_API_URL = "https://api.github.com/repos";

export async function fetchRepoData(user: string, repo: string): Promise<ResponseData> {
    // Fetch the repository data and the tree data
    const repoData = await graphql({
        query: gqlQuery,
        owner: user,
        count: 10,
        name: repo,
        ...GITHUB_HEADERS
    }) as RepositoryData;
    // Determine the branch to fetch the tree data from
    const BRANCH = repoData.repository.defaultBranchRef.name;
    // Fetch the tree data for the repository
    const treeDataResponse = await fetch(`${GITHUB_API_URL}/${user}/${repo}/git/trees/${BRANCH}?recursive=1`, {
        ...GITHUB_HEADERS
    }).then(res => res.json()); // Parse the response as JSON

    // Return the data for server-action
    return {
        repo: repoData,
        tree: ParseTree(treeDataResponse),
    }
}
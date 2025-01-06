export const gqlQuery = `
query($owner: String!, $name: String!, $count: Int!) {
  repository(owner: $owner, name: $name) {
    name
    description
    nameWithOwner
    defaultBranchRef {
      name
    }
    url
    createdAt
    updatedAt
    pushedAt
    stargazerCount
    forkCount
    primaryLanguage {
      name
      color
    }
    languages(first: 100) {
      totalCount
      nodes {
        name
        color
      }
    }
    watchers {
      totalCount
    }
    openIssues: issues(states: OPEN last: $count) {
      totalCount
      nodes {
        createdAt
        updatedAt
      }
    }
    closedIssues: issues(states: CLOSED last: $count) {
      totalCount
      nodes {
        createdAt
        closedAt
      }
    }
    pullRequests(states: MERGED last: $count) {
      totalCount
      nodes {
        createdAt
        updatedAt
        mergedAt
        state
      }
    }
    isFork
    forks(first: $count) {
      totalCount
    }
    commits: object(expression: "main") {
      ... on Commit {
        history(first: 10) {
          edges {
            node {
              committedDate
            }
          }
        }
      }
    }
    codeOfConduct {
      key
      name
      url
    }
    issueTemplates {
      filename
    }
    repositoryTopics(first: 100) {
      nodes {
        topic {
          name
        }
      }
    }
    licenseInfo {
      description
    }
    securityPolicyUrl
    hasVulnerabilityAlertsEnabled
    branchProtectionRules(first: $count) {
      nodes {
        pattern
        id
      }
    }
    contributingGuidelines {
      body
    }
    contributors: mentionableUsers {
      totalCount
    }
  }
}
`

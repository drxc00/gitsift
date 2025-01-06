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
        comments {
          totalCount
        }
      }
    }
    isFork
    forks(first: $count) {
      totalCount
    }
    object(expression: "main") {
      ... on Commit {
        history(first: $count) {
          edges {
            node {
              message
              committedDate
              author {
                name
                email
              }
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
      body
    }
    repositoryTopics(first: 100) {
      nodes {
        topic {
          name
        }
      }
    }
    licenseInfo {
      body
      description
    }
    securityPolicyUrl
    hasVulnerabilityAlertsEnabled
    vulnerabilityAlerts (first: 100) {
      nodes {
        createdAt
        state
      }
    }
    branchProtectionRules(first: 100) {
      nodes {
        pattern
        id
      }
    }
    contributingGuidelines {
      body
    }
    latestRelease {
      createdAt
      isPrerelease
    }
    contributors: mentionableUsers {
      totalCount
    }
  }
}
`

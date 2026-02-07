
export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  topics: string[];
  stargazers_count: number;
  homepage: string;
}

export async function getGitHubRepos(username: string, limit: number = 6): Promise<GitHubRepo[]> {
  try {
    const headers: HeadersInit = {};
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=pushed&per_page=${limit}`,
      { headers }
    );

    if (!response.ok) {
      console.error(`GitHub API Error: ${response.status} ${response.statusText}`);
      throw new Error("Failed to fetch repositories");
    }

    const repos = await response.json();
    return repos;
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}

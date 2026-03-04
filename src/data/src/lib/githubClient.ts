// src/lib/githubClient.ts

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const REPO_OWNER = 'Mayne19';
const REPO_NAME = 'numcafe';
const BRANCH = 'main';

export async function publishArticleToGitHub(article: {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  read_time: string;
  image: string;
  published_at: string;
}) {
  const path = `content/articles/${article.slug}.json`;
  const content = btoa(unescape(encodeURIComponent(JSON.stringify(article, null, 2))));

  // Vérifier si le fichier existe déjà
  let sha: string | undefined;
  try {
    const checkRes = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
      { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
    );
    if (checkRes.ok) {
      const existing = await checkRes.json();
      sha = existing.sha;
    }
  } catch {}

  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Publier: ${article.title}`,
        content,
        branch: BRANCH,
        ...(sha && { sha }),
      }),
    }
  );

  if (!res.ok) throw new Error('Erreur publication GitHub');
  return await res.json();
}

export async function deleteArticleFromGitHub(slug: string) {
  const path = `content/articles/${slug}.json`;

  const checkRes = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
    { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
  );

  if (!checkRes.ok) return;
  const existing = await checkRes.json();

  await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Supprimer: ${slug}`,
        sha: existing.sha,
        branch: BRANCH,
      }),
    }
  );
}

export async function fetchArticlesFromGitHub() {
  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/content/articles`,
    { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
  );

  if (!res.ok) return [];

  const files = await res.json();
  const articles = await Promise.all(
    files
      .filter((f: any) => f.name.endsWith('.json'))
      .map(async (f: any) => {
        const fileRes = await fetch(f.download_url);
        return await fileRes.json();
      })
  );

  return articles.sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
}

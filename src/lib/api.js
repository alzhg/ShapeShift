export async function searchArticles(query, rows = 10) {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&rows=${rows}`);
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    return response.json();
  }
  
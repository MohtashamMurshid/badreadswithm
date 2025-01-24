"use server";
const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.GOOGLE_BOOKS_API;

if (!API_KEY) {
  throw new Error("Missing Google Books API key in environment variables");
}

export async function getFantasyTopPicks() {
  // Search for popular and highly rated books
  const searchParams = new URLSearchParams({
    q: "subject:fantasy",
    orderBy: "relevance",
    maxResults: "6",
    key: API_KEY as string,
    fields: "items(id,volumeInfo(title,authors,imageLinks/thumbnail))",
  } as Record<string, string>);

  const url = `${GOOGLE_BOOKS_API_URL}?${searchParams.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching top picks: ${response.statusText}`);
    }
    const data = await response.json();

    if (!data.items) {
      return [];
    }

    // Map the results to match our book data structure
    return data.items.map(
      (item: {
        id: string;
        volumeInfo: {
          title?: string;
          authors?: string[];
          imageLinks?: {
            thumbnail?: string;
          };
        };
      }) => ({
        id: item.id,
        title: item.volumeInfo.title || "No title available",
        authors: item.volumeInfo.authors || ["Unknown Author"],
        thumbnail:
          item.volumeInfo.imageLinks?.thumbnail || "/images/placeholder.png",
      })
    );
  } catch (error) {
    console.error("Error in getTopPicks:", error);
    return [];
  }
}

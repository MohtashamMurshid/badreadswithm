"use server";
const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.GOOGLE_BOOKS_API;

if (!API_KEY) {
  throw new Error("Missing Google Books API key in environment variables");
}

export async function fetchBooks(query: string) {
  if (!query.trim()) {
    throw new Error("Search query cannot be empty.");
  }

  const url = `${GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(
    query
  )}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching books: ${response.statusText}`);
    }
    const data = await response.json();

    // Ensure the data has items and normalize the structure
    if (!data.items) {
      return [];
    }

    // Map the results to ensure the data is clean and consistent
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title || "No title available",
      authors: item.volumeInfo.authors || ["Unknown Author"],
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || null,
    }));
  } catch (error) {
    console.error("Error in fetchBooks:", error);
    throw error;
  }
}

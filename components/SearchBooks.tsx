"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchBooks } from "@/utils/googleApi";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Loading from "./Loading";

export default function SearchBooks() {
  const [query, setQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await fetchBooks(query);
      setBooks(results);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center w-full max-w-3xl space-x-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:w-96"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Search for books"
        />
        <Button variant="ghost" onClick={handleSearch} disabled={loading}>
          <FaSearch className="text-gray-400" />
        </Button>
      </div>

      {loading && <Loading />}
      {error && <p className="text-red-500">{error}</p>}

      {books.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full max-w-7xl mt-4">
          {books.map((book) => (
            <Link href={`/book/${book.id}`} key={book.id}>
              <div className="p-4 border rounded shadow hover:shadow-lg flex flex-col items-center space-y-2">
                {book.thumbnail && (
                  <Image
                    src={book.thumbnail}
                    alt={book.title}
                    className="w-full h-auto rounded"
                    width={200}
                    height={400}
                    objectFit="cover"
                  />
                )}
                <h3 className="font-bold text-sm text-center hover:text-purple-600 transition-colors truncate w-full">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-600 text-center truncate w-full">
                  {book.authors.join(", ")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

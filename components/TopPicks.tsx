"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/Loading";

interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
}

export default function TopPicks({
  getpicks,
  title,
}: {
  getpicks: () => Promise<void>;
  title: string;
}) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopPicks = async () => {
      try {
        const topPicks = await getpicks();
        if (Array.isArray(topPicks)) {
          setBooks(topPicks);
        } else {
          console.error("Invalid data format received for top picks");
          setBooks([]);
        }
      } catch (error) {
        console.error("Error fetching top picks:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPicks();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">{title}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {books.map((book) => (
          <Link href={`/book/${book.id}`} key={book.id}>
            <div className="p-2 border rounded shadow hover:shadow-lg transition-shadow">
              {book.thumbnail && (
                <Image
                  src={book.thumbnail}
                  alt={book.title}
                  width={150}
                  height={225}
                  className="w-full h-auto rounded"
                />
              )}
              <h3 className="font-semibold mt-2 text-sm truncate">
                {book.title}
              </h3>
              <p className="text-xs text-gray-600 truncate">
                {book.authors?.join(", ")}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {books.length === 0 && (
        <p className="text-gray-500 text-center">No books found.</p>
      )}
    </div>
  );
}

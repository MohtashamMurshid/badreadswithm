"use client";

import React, { useEffect, useState } from "react";
import BookCard from "@/components/BookCard";
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
    <div className="w-full p-4 flex flex-col gap-4">
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 text-center">
        {title}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      {books.length === 0 && (
        <p className="text-gray-500 text-center">No books found.</p>
      )}
    </div>
  );
}

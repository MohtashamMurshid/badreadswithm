"use client";
import React from "react";
import BookCard from "@/components/BookCard";

interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
}

export default function TopPicks({
  books,
  title,
}: {
  books: Book[];
  title: string;
}) {
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

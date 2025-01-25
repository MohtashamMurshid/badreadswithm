import React from "react";
import Image from "next/image";
import Link from "next/link";
import StarButton from "./favourite-button";

interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
}

interface BookCardProps {
  book: Book;
  prefix?: string;
}

export default function BookCard({ book, prefix = "" }: BookCardProps) {
  return (
    <div className="relative group">
      <Link href={`/book/${book.id}`} key={`${prefix}-${book.id}`}>
        <div className="p-4 border rounded shadow hover:shadow-lg transition-shadow">
          {book.thumbnail && (
            <Image
              src={book.thumbnail}
              alt={book.title}
              width={150}
              height={225}
              className="w-full md:h-[240px] sm:h-[200px] object-cover rounded"
            />
          )}
          <h3 className="font-bold mt-2 text-sm truncate hover:text-purple-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600">{book.authors?.join(", ")}</p>
        </div>
      </Link>
      <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <StarButton id={book.id} className="w-2" />
      </div>
    </div>
  );
}

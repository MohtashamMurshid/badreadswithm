"use client";

import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/firebaseConfig";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/Loading";
import { fetchOneBookInfo } from "@/utils/oneBookInfo";

interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
}

export default function AuthorsPick() {
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteBooks = async () => {
      const db = getFirestore(app);
      const userEmail = "mohtashammurshid@gmail.com";

      try {
        const favoritesRef = doc(
          db,
          "users",
          userEmail,
          "bookLists",
          "favorites"
        );
        const favoritesSnap = await getDoc(favoritesRef);
        const favoriteIds = favoritesSnap.exists()
          ? favoritesSnap.data().books || []
          : [];

        const favoritesPromises = favoriteIds
          .slice(0, 6)
          .map(async (bookId: string) => {
            try {
              const bookInfo = await fetchOneBookInfo(bookId);
              return { ...bookInfo, id: bookId };
            } catch (error) {
              console.error("Error fetching favorite book:", error);
              return null;
            }
          });

        const favoritesData = await Promise.all(favoritesPromises);
        setFavorites(
          favoritesData.filter((book): book is Book => book !== null)
        );
      } catch (error) {
        console.error("Error fetching favorite books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteBooks();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="w-full p-4 ">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Author&apos;s Picks
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ">
        {favorites.map((book) => (
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
      {favorites.length === 0 && (
        <p className="text-gray-500 text-center">No favorite books found.</p>
      )}
    </div>
  );
}

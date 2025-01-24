"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
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

export default function FavoritesPage() {
  const { user } = useUser();
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [readLater, setReadLater] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedBooks = async () => {
      if (user?.emailAddresses?.[0]?.emailAddress) {
        const db = getFirestore(app);
        const userEmail = user.emailAddresses[0].emailAddress;

        try {
          // Fetch favorites
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

          const favoritesPromises = favoriteIds.map(async (bookId: string) => {
            try {
              const bookInfo = await fetchOneBookInfo(bookId);
              return { ...bookInfo, id: bookId }; // Ensure ID is set
            } catch (error) {
              console.error("Error fetching favorite book:", error);
              return null;
            }
          });

          // Fetch read later
          const readLaterRef = doc(
            db,
            "users",
            userEmail,
            "bookLists",
            "readLater"
          );
          const readLaterSnap = await getDoc(readLaterRef);
          const readLaterIds = readLaterSnap.exists()
            ? readLaterSnap.data().books || []
            : [];

          const readLaterPromises = readLaterIds.map(async (bookId: string) => {
            try {
              const bookInfo = await fetchOneBookInfo(bookId);
              return { ...bookInfo, id: bookId }; // Ensure ID is set
            } catch (error) {
              console.error("Error fetching read later book:", error);
              return null;
            }
          });

          const [favoritesData, readLaterData] = await Promise.all([
            Promise.all(favoritesPromises),
            Promise.all(readLaterPromises),
          ]);

          setFavorites(
            favoritesData.filter((book): book is Book => book !== null)
          );
          setReadLater(
            readLaterData.filter((book): book is Book => book !== null)
          );
        } catch (error) {
          console.error("Error fetching saved books:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSavedBooks();
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        My Library
      </h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-600">
          Favorites
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {favorites.map((book) => (
            <Link href={`/book/${book.id}`} key={`fav-${book.id}`}>
              <div className="p-4 border rounded shadow hover:shadow-lg transition-shadow">
                {book.thumbnail && (
                  <Image
                    src={book.thumbnail}
                    alt={book.title}
                    width={200}
                    height={300}
                    className="w-full h-auto rounded"
                  />
                )}
                <h3 className="font-bold mt-2 text-sm truncate hover:text-purple-600 transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {book.authors?.join(", ")}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {favorites.length === 0 && (
          <p className="text-gray-500">No favorite books yet.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-purple-600">
          Read Later
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {readLater.map((book) => (
            <Link href={`/book/${book.id}`} key={`readlater-${book.id}`}>
              <div className="p-4 border rounded shadow hover:shadow-lg transition-shadow">
                {book.thumbnail && (
                  <Image
                    src={book.thumbnail}
                    alt={book.title}
                    width={200}
                    height={300}
                    className="w-full h-auto rounded"
                  />
                )}
                <h3 className="font-semibold mt-2">{book.title}</h3>
                <p className="text-sm text-gray-600">
                  {book.authors?.join(", ")}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {readLater.length === 0 && (
          <p className="text-gray-500">No books marked for reading later.</p>
        )}
      </section>
    </div>
  );
}

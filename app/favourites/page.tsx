"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getFirestore, collection, getDocs } from "firebase/firestore";
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

        // Fetch favorites
        const favoritesRef = collection(db, "users", userEmail, "favorites");
        const favoritesSnapshot = await getDocs(favoritesRef);
        const favoritesPromises = favoritesSnapshot.docs.map(async (doc) => {
          const bookData = doc.data();
          const bookInfo = await fetchOneBookInfo(bookData.FavitemId); // Changed from bookData.bookId to bookData.FavitemId
          return bookInfo;
        });

        // Fetch read later
        const readLaterRef = collection(db, "users", userEmail, "readLater");
        const readLaterSnapshot = await getDocs(readLaterRef);
        const readLaterPromises = readLaterSnapshot.docs.map(async (doc) => {
          const bookData = doc.data();
          const bookInfo = await fetchOneBookInfo(bookData.FavitemId); // Changed here as well for consistency
          return bookInfo;
        });

        const [favoritesData, readLaterData] = await Promise.all([
          Promise.all(favoritesPromises),
          Promise.all(readLaterPromises),
        ]);

        setFavorites(favoritesData);
        setReadLater(readLaterData);
        setLoading(false);
      }
    };

    fetchSavedBooks();
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-3xl font-bold mb-8">My Library</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Favorites</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((book) => (
            <Link href="/book/[id]" as={`/book/${book.id}`} key={book.id}>
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
        {favorites.length === 0 && (
          <p className="text-gray-500">No favorite books yet.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Read Later</h2>
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

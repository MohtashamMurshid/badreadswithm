"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/firebaseConfig";
import BookCard from "@/components/BookCard";
import Loading from "@/components/Loading";
import { fetchOneBookInfo } from "@/utils/oneBookInfo";
import ShareButton from "@/components/share-button";

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
  const [activeTab, setActiveTab] = useState("favorites");

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
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 text-center mb-8">
        My Library
      </h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("favorites")}
            className={`px-4 py-2 text-lg font-semibold transition-colors duration-200 ${
              activeTab === "favorites"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            Favorites
          </button>
          <button
            onClick={() => setActiveTab("readLater")}
            className={`px-4 py-2 text-lg font-semibold transition-colors duration-200 ${
              activeTab === "readLater"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            Read Later
          </button>
        </div>
        {user?.emailAddresses?.[0]?.emailAddress &&
          activeTab === "favorites" && <ShareButton />}
      </div>

      {activeTab === "favorites" && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {favorites.map((book) => (
            <BookCard key={`fav-${book.id}`} book={book} prefix="fav" />
          ))}
          {favorites.length === 0 && (
            <p className="text-gray-500 col-span-full text-center">
              No favorite books yet.
            </p>
          )}
        </div>
      )}

      {activeTab === "readLater" && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {readLater.map((book) => (
            <BookCard
              key={`readlater-${book.id}`}
              book={book}
              prefix="readlater"
            />
          ))}
          {readLater.length === 0 && (
            <p className="text-gray-500 col-span-full text-center">
              No books marked for reading later.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

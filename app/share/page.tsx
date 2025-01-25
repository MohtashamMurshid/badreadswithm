"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/firebaseConfig";
import BookCard from "@/components/BookCard";
import { fetchOneBookInfo } from "@/utils/oneBookInfo";

interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
}

export default function SharePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteBooks = async () => {
      if (!email) return;

      const db = getFirestore(app);
      const docRef = doc(db, "users", email, "bookLists", "favorites");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const favoriteIds = docSnap.data().books || [];
        const bookPromises = favoriteIds.map((id: string) =>
          fetchOneBookInfo(id)
        );
        const bookResults = await Promise.all(bookPromises);
        setBooks(bookResults.filter((book): book is Book => book !== null));
      }
      setLoading(false);
    };

    fetchFavoriteBooks();
  }, [email]);

  if (!email) {
    return <div className="p-4">No user specified</div>;
  }

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shared Favorite Books</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {books.map((book) => (
          <BookCard key={`shared-${book.id}`} book={book} prefix="shared" />
        ))}
      </div>
    </div>
  );
}

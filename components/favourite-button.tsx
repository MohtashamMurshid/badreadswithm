"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { FaStar } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "@/firebaseConfig";
import { cn } from "@/lib/utils";

export default function StarButton({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const { user } = useUser();
  const [favorite, setFavorite] = useState(false);
  const db = getFirestore(app);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user?.emailAddresses?.[0]?.emailAddress) {
        const userEmail = user.emailAddresses[0].emailAddress;
        const docRef = doc(db, "users", userEmail, "bookLists", "favorites");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const favorites = docSnap.data().books || [];
          setFavorite(favorites.includes(id));
        }
      }
    };

    checkFavoriteStatus();
  }, [user, id, db]);

  const handleFavoriteClick = async () => {
    if (user?.emailAddresses?.[0]?.emailAddress) {
      const userEmail = user.emailAddresses[0].emailAddress;
      const docRef = doc(db, "users", userEmail, "bookLists", "favorites");
      const docSnap = await getDoc(docRef);

      let favorites = [];
      if (docSnap.exists()) {
        favorites = docSnap.data().books || [];
      }

      if (favorite) {
        // Remove from favorites
        favorites = favorites.filter((bookId: string) => bookId !== id);
      } else {
        // Add to favorites
        favorites.push(id);
      }

      await setDoc(docRef, { books: favorites }, { merge: true });
      setFavorite(!favorite);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleFavoriteClick}
      className={cn("", className)}
    >
      {favorite ? (
        <FaStar className="text-yellow-400"></FaStar>
      ) : (
        <FaStar className=""></FaStar>
      )}
    </Button>
  );
}

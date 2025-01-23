"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { FaStar } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "@/firebaseConfig"; //

export default function StarButton({ id }: { id: string }) {
  const { user } = useUser();
  const [favorite, setFavorite] = useState(false);
  const db = getFirestore(app);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user && user.emailAddresses) {
        const userEmail = user.emailAddresses[0].emailAddress;
        const docRef = doc(db, "users", userEmail, "favorites", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFavorite(true);
        }
      }
    };

    checkFavoriteStatus();
  }, [user, id, db]);

  const handleFavoriteClick = async () => {
    setFavorite(!favorite);
    if (user && user.emailAddresses) {
      const userEmail = user.emailAddresses[0].emailAddress;
      const FavitemId = id;
      const docRef = doc(db, "users", userEmail, "favorites", FavitemId);
      await setDoc(docRef, { FavitemId }, { merge: true });
    }
  };

  return (
    <Button variant="outline" onClick={handleFavoriteClick}>
      {favorite ? (
        <FaStar className="text-yellow-400"></FaStar>
      ) : (
        <FaStar className=""></FaStar>
      )}
    </Button>
  );
}

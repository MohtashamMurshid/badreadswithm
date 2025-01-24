"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "@/firebaseConfig";

export default function ReadLater({ id }: { id: string }) {
  const { user } = useUser();
  const [readLater, setReadLater] = useState(false);
  const db = getFirestore(app);

  useEffect(() => {
    const checkReadLaterStatus = async () => {
      if (user?.emailAddresses?.[0]?.emailAddress) {
        const userEmail = user.emailAddresses[0].emailAddress;
        const docRef = doc(db, "users", userEmail, "bookLists", "readLater");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const readLaterList = docSnap.data().books || [];
          setReadLater(readLaterList.includes(id));
        }
      }
    };

    checkReadLaterStatus();
  }, [user, id, db]);

  const handleReadLaterClick = async () => {
    if (user?.emailAddresses?.[0]?.emailAddress) {
      const userEmail = user.emailAddresses[0].emailAddress;
      const docRef = doc(db, "users", userEmail, "bookLists", "readLater");
      const docSnap = await getDoc(docRef);

      let readLaterList = [];
      if (docSnap.exists()) {
        readLaterList = docSnap.data().books || [];
      }

      if (readLater) {
        // Remove from read later list
        readLaterList = readLaterList.filter((bookId: string) => bookId !== id);
      } else {
        // Add to read later list
        readLaterList.push(id);
      }

      await setDoc(docRef, { books: readLaterList }, { merge: true });
      setReadLater(!readLater);
    }
  };

  return (
    <Button variant="outline" onClick={handleReadLaterClick}>
      {readLater ? "Reading later" : "Read Later"}
    </Button>
  );
}

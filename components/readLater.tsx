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
      if (user && user.emailAddresses) {
        const userEmail = user.emailAddresses[0].emailAddress;
        const docRef = doc(db, "users", userEmail, "readLater", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setReadLater(true);
        }
      }
    };

    checkReadLaterStatus();
  }, [user, id, db]);

  const handleReadLaterClick = async () => {
    setReadLater(!readLater);
    if (user && user.emailAddresses) {
      const userEmail = user.emailAddresses[0].emailAddress;
      const readLaterId = id;
      const docRef = doc(db, "users", userEmail, "readLater", readLaterId);
      await setDoc(docRef, { readLaterId }, { merge: true });
    }
  };

  return (
    <Button variant="outline" onClick={handleReadLaterClick}>
      {readLater ? "Reading later" : "Read Later"}
    </Button>
  );
}

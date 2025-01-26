"use server";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/firebaseConfig";
import { fetchOneBookInfo } from "./oneBookInfo";

export async function getAuthorsPicks() {
  const db = getFirestore(app);
  const userEmail = "mohtashammurshid@gmail.com";

  try {
    const favoritesRef = doc(db, "users", userEmail, "bookLists", "favorites");
    const favoritesSnap = await getDoc(favoritesRef);
    const favoriteIds = favoritesSnap.exists() ? favoritesSnap.data().books || [] : [];

    const favoritesPromises = favoriteIds.slice(0, 6).map(async (bookId: string) => {
      try {
        const bookInfo = await fetchOneBookInfo(bookId);
        return { ...bookInfo, id: bookId };
      } catch (error) {
        console.error("Error fetching favorite book:", error);
        return null;
      }
    });

    const favoritesData = await Promise.all(favoritesPromises);
    return favoritesData.filter((book) => book !== null);
  } catch (error) {
    console.error("Error fetching favorite books:", error);
    return [];
  }
}
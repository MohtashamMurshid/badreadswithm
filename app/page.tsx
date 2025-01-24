import Landing from "@/components/Landing";
import SearchBooks from "@/components/SearchBooks";
import BookCategories from "@/components/BookCategories";
import { Suspense } from "react";
import Fallback from "@/components/Fallback";

export default function Page() {
  return (
    <div className="p-4 md:p-10 flex flex-col items-center space-y-4">
      <Landing />
      <SearchBooks />
      <Suspense fallback={<Fallback />}>
        <BookCategories />
      </Suspense>
    </div>
  );
}

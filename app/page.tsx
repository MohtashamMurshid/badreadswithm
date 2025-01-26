import Landing from "@/components/Landing";
import SearchBooks from "@/components/SearchBooks";
import BookCategories from "@/components/BookCategories";
import { Suspense } from "react";
import Fallback from "@/components/Fallback";
import { getFantasyTopPicks } from "@/utils/getFantasyTopPicks";
import { getFictionTopPicks } from "@/utils/getFictionTopPicks";
import { getMysteryTopPicks } from "@/utils/getMysteryTopPicks";
import { getRomanceTopPicks } from "@/utils/getRomanceTopPicks";
import { getAuthorsPicks } from "@/utils/getAuthorsPicks";

export default async function Page() {
  const [fantasy, fiction, mystery, romance, authors] = await Promise.all([
    getFantasyTopPicks(),
    getFictionTopPicks(),
    getMysteryTopPicks(),
    getRomanceTopPicks(),
    getAuthorsPicks(),
  ]);
  return (
    <div className="p-4 md:p-10 flex flex-col items-center space-y-4">
      <Landing />
      <SearchBooks />
      <Suspense fallback={<Fallback />}>
        <BookCategories
          getFantasyTopPicks={fantasy}
          getFictionTopPicks={fiction}
          getMysteryTopPicks={mystery}
          getRomanceTopPicks={romance}
          getAuthorsPicks={authors}
        />
      </Suspense>
    </div>
  );
}

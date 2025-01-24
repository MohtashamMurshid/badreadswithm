import TopPicks from "@/components/TopPicks";
import { getFantasyTopPicks } from "@/utils/getFantasyTopPicks";
import { getFictionTopPicks } from "@/utils/getFictionTopPicks";
import { getMysteryTopPicks } from "@/utils/getMysteryTopPicks";
import { getRomanceTopPicks } from "@/utils/getRomanceTopPicks";
import AuthorsPick from "./AuthorsPick";

export default async function BookCategories() {
  return (
    <>
      <AuthorsPick />
      <div>
        <TopPicks getpicks={getFantasyTopPicks} title="Popular Fantasy" />
        <TopPicks getpicks={getFictionTopPicks} title="Popular Fiction" />
        <TopPicks getpicks={getMysteryTopPicks} title="Popular Mystery" />
        <TopPicks getpicks={getRomanceTopPicks} title="Popular Romance" />
      </div>
    </>
  );
}
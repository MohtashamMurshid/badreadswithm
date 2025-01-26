/* eslint-disable @typescript-eslint/no-explicit-any */
import TopPicks from "@/components/TopPicks";
import AuthorsPick from "./AuthorsPick";

interface Props {
  getFantasyTopPicks: any[];
  getFictionTopPicks: any[];
  getMysteryTopPicks: any[];
  getRomanceTopPicks: any[];
}

export default function BookCategories({
  getFantasyTopPicks,
  getFictionTopPicks,
  getMysteryTopPicks,
  getRomanceTopPicks,
}: Props) {
  return (
    <>
      <AuthorsPick />
      <div>
        <TopPicks books={getFantasyTopPicks} title="Popular Fantasy" />
        <TopPicks books={getFictionTopPicks} title="Popular Fiction" />
        <TopPicks books={getMysteryTopPicks} title="Popular Mystery" />
        <TopPicks books={getRomanceTopPicks} title="Popular Romance" />
      </div>
    </>
  );
}

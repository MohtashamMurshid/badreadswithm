/* eslint-disable @typescript-eslint/no-explicit-any */
import TopPicks from "@/components/TopPicks";
import AuthorsPick from "./AuthorsPick";
import { getAuthorsPicks } from "@/utils/getAuthorsPicks";

interface Props {
  getFantasyTopPicks: any[];
  getFictionTopPicks: any[];
  getMysteryTopPicks: any[];
  getRomanceTopPicks: any[];
}

export default async function BookCategories({
  getFantasyTopPicks,
  getFictionTopPicks,
  getMysteryTopPicks,
  getRomanceTopPicks,
}: Props) {
  return (
    <>
      <AuthorsPick books={await getAuthorsPicks()} />
      <div>
        <TopPicks books={getFantasyTopPicks} title="Popular Fantasy" />
        <TopPicks books={getFictionTopPicks} title="Popular Fiction" />
        <TopPicks books={getMysteryTopPicks} title="Popular Mystery" />
        <TopPicks books={getRomanceTopPicks} title="Popular Romance" />
      </div>
    </>
  );
}

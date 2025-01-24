import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";

export default function Favorite() {
  return (
    <Link
      href="/favourites"
      className="p-2 rounded border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
    >
      <FaStar />
    </Link>
  );
}

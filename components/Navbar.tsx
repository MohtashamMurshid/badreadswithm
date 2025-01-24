import React from "react";
import { ModeToggle } from "./mode-toggle";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import Favorite from "./Favorite";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 right-0 p-4 flex items-center space-x-2">
      <ModeToggle />
      <SignedOut>
        <Button variant="outline">
          <SignInButton />
        </Button>
      </SignedOut>
      <SignedIn>
        <Link
          href="/"
          className="p-2 rounded border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
        >
          <FaHome></FaHome>
        </Link>
        <Favorite />
        <UserButton />
      </SignedIn>
    </nav>
  );
}

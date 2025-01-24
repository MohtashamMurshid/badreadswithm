import React from "react";
import { FaBookOpen } from "react-icons/fa";

const Landing = () => {
  return (
    <section className="flex justify-center items-center bg-gradient-to-b from-transparent to-background/5">
      <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-2xl mx-auto px-4">
        <FaBookOpen className="w-24 h-24 mb-2 text-primary animate-pulse" />
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Bad Reads
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover your next favorite book, even if it&apos;s not that good.
        </p>
      </div>
    </section>
  );
};

export default Landing;

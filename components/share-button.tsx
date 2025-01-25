"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { FaShare } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ShareButton({ className }: { className?: string }) {
  const { user } = useUser();
  const [copying, setCopying] = useState(false);

  const handleShare = async () => {
    if (!user?.emailAddresses?.[0]?.emailAddress) {
      toast.error("Please sign in to share");
      return;
    }

    const email = encodeURIComponent(user.emailAddresses[0].emailAddress);
    const shareUrl = `${window.location.origin}/share?email=${email}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopying(true);
      toast.success("Share link copied to clipboard!");
      setTimeout(() => setCopying(false), 2000);
    } catch (error) {
      console.error("Failed to copy share link:", error);
      toast.error("Failed to copy share link. Please try again.");
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleShare}
      className={cn(
        "transition-all duration-200 flex items-center gap-2",
        copying ? "bg-green-500 text-white hover:bg-green-600" : "",
        className
      )}
      disabled={copying}
    >
      <FaShare className={cn("w-4 h-4", copying ? "animate-pulse" : "")} />
      {copying ? "Copied!" : "Share List"}
    </Button>
  );
}

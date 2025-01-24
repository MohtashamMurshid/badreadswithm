"use client";

import React from "react";

const Fallback = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="p-4 border rounded-lg shadow-md animate-pulse bg-background/5 transition-shadow duration-200 hover:shadow-lg"
          >
            <div className="w-full aspect-[2/3] bg-muted/60 rounded-md mb-4 relative overflow-hidden">
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-transparent animate-shimmer"
                style={{ backgroundSize: "200% 100%" }}
              />
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-muted/60 rounded-full w-[85%] relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-transparent animate-shimmer"
                  style={{ backgroundSize: "200% 100%" }}
                />
              </div>
              <div className="h-3 bg-muted/60 rounded-full w-[65%] relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-transparent animate-shimmer"
                  style={{ backgroundSize: "200% 100%" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fallback;

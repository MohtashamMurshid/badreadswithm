"use client";

const Fallback = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center mb-6">
        <div className="w-48 h-8 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="p-4 border rounded shadow flex flex-col items-center space-y-2 animate-pulse"
          >
            <div className="w-full h-48 bg-gray-200 rounded" />
            <div className="w-3/4 h-4 bg-gray-200 rounded" />
            <div className="w-1/2 h-3 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fallback;

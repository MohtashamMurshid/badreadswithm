import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-96">
      <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
    </div>
  );
};

export default Loading;

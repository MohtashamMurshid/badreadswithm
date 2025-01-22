import React from "react";
import { FaBookOpen } from "react-icons/fa";

const Landing = () => {
  return (
    <section className="p-10 flex justify-center items-center ">
      <div className="flex flex-col items-center justify-center text-center">
        <FaBookOpen className="w-20 h-20 mb-4" />
        <h2 className="text-6xl font-bold">Bad Reads</h2>
      </div>
    </section>
  );
};

export default Landing;

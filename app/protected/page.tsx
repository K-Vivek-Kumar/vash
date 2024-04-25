import LoginNav from "@/components/LoginNav";
import React from "react";

const ProtectedPage = () => {
  return (
    <>
      <LoginNav />
      <div className="flex justify-center items-center my-24 bg-white">
        <div className="p-6 border-2 border-green-500 rounded-lg shadow-md bg-white text-green-500">
          <h1 className="text-3xl font-bold mb-4">Protected Page</h1>
          <p className="text-lg mb-2">This page is protected.</p>
          <p className="text-lg">Please log in to access this content.</p>
        </div>
      </div>
    </>
  );
};

export default ProtectedPage;

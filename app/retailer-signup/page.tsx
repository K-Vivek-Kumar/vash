"use client";

import LoginNav from "@/components/LoginNav";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RetailerSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    address: "",
  });

  const router = useRouter();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignup = async () => {
    const { name, email, password, phoneNo, address } = formData;

    try {
      const requestBody = {
        name,
        email,
        password,
        phoneNo,
        address,
      };

      const response = await fetch("http://127.0.0.1:5000/retailer-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.text();
        alert(data);
      } else {
        throw new Error("Signup request failed");
      }
      router.push("/retailer-login");
    } catch (error: any) {
      console.error("Error during signup:", error.message);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <>
      <LoginNav />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-3xl font-semibold mb-4">Retailer Signup</h2>
        <div className="w-full max-w-xs">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="text"
            name="phoneNo"
            placeholder="Phone Number"
            value={formData.phoneNo}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            onClick={handleSignup}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default RetailerSignup;

"use client";

import React, { useState } from "react";
import axios from "axios";
import LoginNav from "@/components/LoginNav";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      const userData = {
        name: name,
        email: email,
        password: password,
      };

      const response = await axios.post(
        "http://127.0.0.1:5000/signup",
        userData
      );

      setMessage(response.data);
      router.push("/user-login");
    } catch (error: any) {
      setMessage("Error signing up. Please try again.");
    }
  };

  return (
    <>
      <LoginNav />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-3xl font-semibold mb-4">Signup Form</h2>
        <div className="max-w-md w-full bg-white shadow-md rounded px-8 py-6 mb-8">
          <form onSubmit={handleSignup} className="space-y-4">
            <label htmlFor="name" className="block text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="password" className="block text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </form>
        </div>
        {message && <div>{message}</div>}
      </div>
    </>
  );
};

export default SignupForm;

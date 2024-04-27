"use client";

import useToken from "@/app/useToken";
import LoginNav from "@/components/LoginNav";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Login() {
  const router = useRouter();
  const { setToken } = useToken();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const logMeIn = async (event: any) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/retailer-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed.");
      }

      const data = await response.json();
      if (data && data.access_token) {
        setToken(data.access_token);
      }
      router.push("/inventory");
    } catch (error: any) {
      console.error("Error logging in:", error.message);
    }

    setLoginForm({
      email: "",
      password: "",
    });
  };

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setLoginForm((prevLoginForm) => ({
      ...prevLoginForm,
      [name]: value,
    }));
  };

  return (
    <>
      <LoginNav />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-semibold mb-4">Login</h1>
        <div className="max-w-md w-full bg-white shadow-md rounded px-8 py-6 mb-8">
          <form onSubmit={logMeIn} className="space-y-4">
            <input
              onChange={handleChange}
              type="text"
              name="email"
              placeholder="Email"
              value={loginForm.email}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Password"
              value={loginForm.password}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

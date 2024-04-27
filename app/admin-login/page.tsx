"use client";
// Login.js
import useToken from "@/app/useToken";
import LoginNav from "@/components/LoginNav";
import { useRouter } from "next/navigation"; // Use next/router instead of next/navigation
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
      const response = await fetch("http://127.0.0.1:5000/admin-login", {
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
        router.push("/admin");
      }
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
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-xs">
          <h1 className="text-2xl mb-4 text-center">Login</h1>
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={logMeIn}
          >
            <div className="mb-4">
              <input
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Email"
                value={loginForm.email}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <input
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Password"
                value={loginForm.password}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

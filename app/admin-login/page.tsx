"use client";
// Login.js
import useToken from "@/lib/useToken";
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
        router.push("/admin"); // Redirect to admin page upon successful login
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
    <div>
      <h1>Login</h1>
      <form className="login" onSubmit={logMeIn}>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
          value={loginForm.email}
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
          value={loginForm.password}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;

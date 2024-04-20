"use client";

import { useState } from "react";
import Head from "next/head";

const AdminPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();
    // Implement your login logic using 'email' and 'password' states
    console.log("Login:", { email, password });
  };

  const handleAddAdmin = async () => {
    // Implement your add admin logic using 'adminEmail' and 'adminPassword' states
    console.log("Add Admin:", { adminEmail, adminPassword });
  };

  return (
    <div className="min-h-screen bg-green-900 text-white flex justify-center items-center">
      <Head>
        <title>Admin Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="p-8 bg-green-700 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-green-800 text-white focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-green-800 text-white focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-green-200"
          >
            Login
          </button>
        </form>

        <div className="mt-8 border-t border-green-800 pt-6">
          <h2 className="text-2xl mb-4 text-center">Add Admin</h2>
          <div className="mb-4">
            <label htmlFor="admin_email" className="block mb-2">
              Email:
            </label>
            <input
              type="email"
              id="admin_email"
              name="admin_email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-green-800 text-white focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="admin_password" className="block mb-2">
              Password:
            </label>
            <input
              type="password"
              id="admin_password"
              name="admin_password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-green-800 text-white focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>
          <button
            type="button"
            onClick={handleAddAdmin}
            className="w-full bg-green-600 hover:bg-green-500 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-green-200"
          >
            Add Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

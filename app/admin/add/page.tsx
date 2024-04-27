"use client";

import React, { useState } from "react";
import axios from "axios";
import AdminNav from "@/components/AdminNav";

const AddAdminPage = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleAddAdmin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/add-admin",
        {
          admin_email: adminEmail,
          admin_password: adminPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Admin added successfully");
        setAdminEmail("");
        setAdminPassword("");
      } else {
        alert("Failed to add admin");
      }
    } catch (error: any) {
      console.error("Error adding admin:", error.message);
      alert("Failed to add admin");
    }
  };

  return (
    <>
      <AdminNav />
      <div className="max-w-md mx-auto mt-8 p-6 min-h-screen bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add Admin</h2>
        <form onSubmit={handleAddAdmin}>
          <div className="mb-4">
            <label
              htmlFor="adminEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="adminEmail"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="adminPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="adminPassword"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Admin
          </button>
        </form>
      </div>
    </>
  );
};

export default AddAdminPage;

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import useToken from "@/components/useToken";
import { useRouter } from "next/navigation";
import axios from "axios";
import logout from "@/lib/logOut";

const RetailerNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { token } = useToken();
  const [profileData, setProfileData] = useState("INACTIVE");
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!token) {
          return;
        }
        const response = await axios.get(
          "http://127.0.0.1:5000/current-retailer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = response.data;
        if (!response.status) {
          return;
        }
        setProfileData(responseData.retailer);
        setIsLoggedIn(true);
      } catch (error) {
        return;
      }
    };

    fetchProfileData();
  }, [token]);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white p-4">
      <div className="flex items-center">
        <Link href="/" legacyBehavior passHref>
          <a className="flex items-center">
            <img src="/full_logo.png" alt="Logo" className="h-8 mr-2" />
          </a>
        </Link>
        <div className="ml-4">
          <Link href="/inventory" legacyBehavior passHref>
            <a className="text-white hover:text-gray-300">Inventory</a>
          </Link>
        </div>
      </div>
      <div>
        {isLoggedIn ? (
          <>
            <div>Logged In as {profileData}</div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md bg-blue-500 text-white mr-4"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" legacyBehavior passHref>
            <a className="px-4 py-2 rounded-md bg-blue-500 text-white">Login</a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default RetailerNavbar;

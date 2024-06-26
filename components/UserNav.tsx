// Navbar.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import useToken from "@/app/useToken";
import logout from "@/lib/logOut";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState("INACTIVE");
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!localStorage.getItem("token")) {
          return;
        }
        const response = await axios.get("http://127.0.0.1:5000/current-user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const responseData = response.data;
        if (!response.status) {
          return;
        }
        setProfileData(responseData.user);
        setIsLoggedIn(true);
      } catch (error) {
        return;
      }
    };

    fetchProfileData();
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between bg-white text-white p-4">
      <div className="flex items-center cursor-pointer">
        <Link href="/" legacyBehavior>
          <img src="/full_logo.png" alt="Logo" className="h-8 mr-2" />
        </Link>
      </div>
      <div className="flex items-center">
        <Link href="/cart" legacyBehavior passHref>
          <a className="mr-4 text-green-500 flex bg-gray-200 px-4 py-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            Cart
          </a>
        </Link>
        {isLoggedIn ? (
          <>
            <Link href="/profile" legacyBehavior passHref>
              <a className="mr-4 bg-green-700 px-4 py-2 rounded-lg">Profile</a>
            </Link>
            <Link href="/past-orders" legacyBehavior passHref>
              <a className="mr-4 bg-green-700 px-4 py-2 rounded-lg">
                Your Orders
              </a>
            </Link>
            <div className="text-green-800 mr-4">Logged In</div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md bg-blue-500"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/user-login" legacyBehavior>
            <a className="px-4 py-2 rounded-md bg-blue-500 text-white">Login</a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import AddressSelector from "./Address";
import PhoneNumberUpdate from "./PhoneNumber";
import UserNav from "@/components/UserNav";
import { useRouter } from "next/navigation";

export interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string | null;
  created_at: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<User>();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:5000/user-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data.user);
      } catch (error: any) {
        router.push("/");
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <UserNav />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white shadow-md rounded px-8 py-6 mb-8">
          <h2 className="text-3xl font-semibold mb-4">User Profile</h2>
          {userData ? (
            <div>
              <p>Name: {userData.name}</p>
              <p>Email: {userData.email}</p>
              <p>Created: {userData.created_at}</p>
              <p>Phone Number: {userData.phone_number}</p>
              <AddressSelector />
              <PhoneNumberUpdate />
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;

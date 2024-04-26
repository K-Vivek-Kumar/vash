"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import AddressSelector from "./Address";
import PhoneNumberUpdate from "./PhoneNumber";

export interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string | null;
  created_at: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<User>();

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
        console.error("Error fetching user profile:", error.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
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
  );
};

export default Profile;

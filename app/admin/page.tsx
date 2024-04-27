"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminStats from "./Statistics";
import AdminNav from "@/components/AdminNav";

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!localStorage.getItem("token")) {
          router.push("/admin-login");
          return;
        }

        const response = await axios.get("http://127.0.0.1:5000/admin-home", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const responseData = response.data;

        if (!response.status) {
          if (response.status === 403) {
            console.log("Access forbidden");
            router.push("/admin-login");
          } else {
            console.log(`Failed to fetch profile data: ${response.status}`);
            router.push("/admin-login");
          }
          return;
        }

        setProfileData(responseData.admin);
      } catch (error) {
        router.push("/admin-login");
      }
    };

    fetchProfileData();
  }, []);

  return (
    <>
      <AdminNav />
      <div className="Profile">
        <h2 className="text-3xl font-bold m-4">Profile</h2>
        {profileData ? (
          <div className="m-4">
            <div className="text-md font-semibold">Name: {profileData}</div>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
        <AdminStats />
      </div>
    </>
  );
}

export default Profile;

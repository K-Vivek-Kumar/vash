"use client";

import useToken from "@/components/useToken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminStats from "./Statistics";

function Profile() {
  const { token } = useToken();
  const [profileData, setProfileData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!token) {
          router.push("/admin-login");
          return;
        }

        const response = await axios.get("http://127.0.0.1:5000/admin-home", {
          headers: {
            Authorization: `Bearer ${token}`,
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
  }, [token, router]);

  return (
    <div className="Profile">
      <h2>Profile</h2>
      {profileData ? (
        <div>
          <p>Name: {profileData}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
      <AdminStats />
    </div>
  );
}

export default Profile;

"use client";

import useToken from "@/app/useToken";
import { useEffect, useState } from "react";

function Profile() {
  const { token } = useToken();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/admin-home", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setProfileData(data.admin);
      } catch (error: any) {
        console.error("Error fetching profile data:", error.message);
      }
    };

    if (token) {
      fetchProfileData();
    }
  }, [token]);

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
    </div>
  );
}

export default Profile;

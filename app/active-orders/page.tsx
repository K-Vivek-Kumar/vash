"use client";

import useToken from "@/components/useToken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import RetailerNavbar from "@/components/RetailerNav";

function Profile() {
  const { token } = useToken();
  const [profileData, setProfileData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!token) {
          router.push("/retailer-login");
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
          if (response.status === 403) {
            console.log("Access forbidden");
            router.push("/retailer-login");
          } else {
            console.log(`Failed to fetch profile data: ${response.status}`);
            router.push("/retailer-login");
          }
          return;
        }

        setProfileData(responseData.retailer);
      } catch (error) {
        router.push("/retailer-login");
      }
    };

    fetchProfileData();
  }, [token, router]);

  return (
    <>
      <RetailerNavbar />
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
    </>
  );
}

export default Profile;

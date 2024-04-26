// AdminStats.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminStats = () => {
  const [statsData, setStatsData] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/admin-stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Make sure to replace 'token' with your token storage key
          },
        });
        setStatsData(response.data.data);
      } catch (error: any) {
        console.error("Error fetching admin stats:", error.message);
      }
    };

    fetchStats();
  }, []);

  if (!statsData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Admin Statistics</h2>
      <ul>
        <li>Total Users: {statsData.total_users}</li>
        <li>New Users in Last 24 Hours: {statsData.new_users_last_24_hours}</li>
        <li>Users Since Last Month: {statsData.users_since_last_month}</li>
        <li>"total_retailers": {statsData.total_retailers}</li>
        <li>
          "new_retailers_last_24_hours": {statsData.new_retailers_last_24_hours}
        </li>
        <li>
          "retailers_since_last_month": {statsData.retailers_since_last_month}
        </li>
      </ul>
    </div>
  );
};

export default AdminStats;

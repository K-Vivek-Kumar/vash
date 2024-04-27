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
    <div className="">
      <h2 className="text-3xl font-bold m-4">Admin Statistics</h2>
      <div className="flex flex-wrap justify-between p-4 gap-4">
        <SubscriberCard title={"Total Users"} amount={statsData.total_users} />
        <SubscriberCard
          title={"New Users in Last 24hrs"}
          amount={statsData.new_users_last_24_hours}
        />
        <SubscriberCard
          title={"Users in Last 30 Days"}
          amount={statsData.users_since_last_month}
        />
        <SubscriberCard
          title={"Retailers Registered"}
          amount={statsData.total_retailers}
        />
        <SubscriberCard
          title={"New Retailers in Last 24hrs"}
          amount={statsData.new_retailers_last_24_hours}
        />
        <SubscriberCard
          title={"Retailers in Last 30 Days"}
          amount={statsData.retailers_since_last_month}
        />
        <SubscriberCard
          title={"Total Amount"}
          amount={statsData.total_orders_price || 0}
        />
        <SubscriberCard
          title={"Total Prepaid Orders"}
          amount={statsData.Payments_count}
        />
        <SubscriberCard
          title={"Prepaid Orders in Last 24hrs"}
          amount={statsData.Payments_count_today}
        />
        <SubscriberCard
          title={"Users Ordered >5 Products"}
          amount={statsData.users_ordered_more_than_5}
        />
        <SubscriberCard
          title={"Users Ordered >10 Products"}
          amount={statsData.users_ordered_more_than_10}
        />
      </div>
    </div>
  );
};

export default AdminStats;

interface SubscriberCardProps {
  title: string;
  amount: number;
}

const SubscriberCard = (props: SubscriberCardProps) => {
  return (
    <div className="w-72 bg-white max-w-xs rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
      <div className="h-20 bg-blue-200 flex items-center justify-between">
        <p className="mr-0 text-blue-900 text-lg pl-5 font-bold">
          {props.title}
        </p>
      </div>
      <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
        <p>TOTAL</p>
      </div>
      <p className="py-4 text-3xl ml-5">{props.amount}</p>
      {/* You can add additional elements or modify styling as needed */}
    </div>
  );
};

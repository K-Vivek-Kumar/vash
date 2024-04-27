"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ActivateProductButton from "./Activate";
import PushOrderStatusButton from "./PushStatus";

type Order = {
  id: number;
  product_id: number;
  address: string;
  quantity: number;
  cash_on_delivery: boolean;
  price: number;
  status: string;
  date_of_order: string;
};

const RetailerOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/active-orders",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setOrders(response.data.order);
      } catch (error: any) {
        console.error("Error fetching orders:", error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold m-4 text-center">Active Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">Order ID</th>
              <th className="py-2 px-4">Product ID</th>
              <th className="py-2 px-4">Address</th>
              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4">Cash on Delivery</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Date of Order</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4">{order.id}</td>
                <td className="py-2 px-4">{order.product_id}</td>
                <td className="py-2 px-4">{order.address}</td>
                <td className="py-2 px-4">{order.quantity}</td>
                <td className="py-2 px-4">
                  {order.cash_on_delivery ? "Yes" : "No"}
                </td>
                <td className="py-2 px-4">{order.price}</td>
                <td className="py-2 px-4">
                  {order.status}
                  <PushOrderStatusButton
                    orderId={order.id}
                    status={parseInt(order.status)}
                  />
                </td>
                <td className="py-2 px-4">{order.date_of_order}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RetailerOrders;

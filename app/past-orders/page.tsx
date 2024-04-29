"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import PDFGeneratorButton from "./GenerateReceipt";
import UserNav from "@/components/UserNav";
import { useRouter } from "next/navigation";

interface Order {
  order_id: number;
  product_id: number;
  product_name: string;
  status: number;
  cash_on_delivery: boolean;
  date_of_order: string;
  date_of_delivery: string;
  price: number;
}

const PendingOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://127.0.0.1:5000/pending-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { allOrders } = response.data;
        setOrders(allOrders);
      } catch (error: any) {
        console.error("Error fetching pending orders:", error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <UserNav />
      <h1 className="text-2xl font-bold m-4">Pending Orders</h1>
      <div className="w-full mx-auto p-4 overflow-x-scroll">
        {orders.length === 0 ? (
          <p>No pending orders found.</p>
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Product ID</th>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Cash on Delivery</th>
                <th className="px-4 py-2">Date of Order</th>
                <th className="px-4 py-2">Date of Delivery</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id} className="border-b border-gray-200">
                  <td className="px-4 py-2">{order.order_id}</td>
                  <td className="px-4 py-2">{order.product_id}</td>
                  <td className="px-4 py-2">{order.product_name}</td>
                  <td className="px-4 py-2">
                    {order.status == 0 ? (
                      <button
                        onClick={() => {
                          router.push(`/past-orders/${order.order_id}`);
                        }}
                      >
                        Make Payment
                      </button>
                    ) : (
                      ""
                    )}
                    {order.status == 1 ? "Waiting for dispatch" : ""}
                    {order.status == 2 ? "Dispatched" : ""}
                    {order.status == 3 ? "Delivered" : ""}
                  </td>
                  <td className="px-4 py-2">
                    {order.cash_on_delivery ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2">{order.date_of_order}</td>
                  <td className="px-4 py-2">{order.date_of_delivery}</td>
                  <td className="px-4 py-2">${order.price}</td>
                  <td className="px-4 py-2">
                    {order.status === 3 ? (
                      <PDFGeneratorButton
                        orderId={order.order_id}
                        productName={order.product_name}
                        price={order.price}
                        dateOfOrder={order.date_of_order}
                        dateOfDelivery={order.date_of_delivery}
                      />
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
export default PendingOrders;

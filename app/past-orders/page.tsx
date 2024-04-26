"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import PDFGeneratorButton from "./GenerateReceipt";

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
    <div>
      <h1>Pending Orders</h1>
      {orders.length === 0 ? (
        <p>No pending orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.order_id}>
              <PDFGeneratorButton
                orderId={order.order_id}
                productName={order.product_name}
              />
              <strong>Order ID:</strong> {order.order_id}
              <br />
              <strong>Product ID:</strong> {order.product_id}
              <br />
              <strong>Product Name:</strong> {order.product_name}
              <br />
              <strong>Status:</strong> {order.status}
              <br />
              <strong>Cash on Delivery:</strong>{" "}
              {order.cash_on_delivery ? "Yes" : "No"}
              <br />
              <strong>Date of Order:</strong> {order.date_of_order}
              <br />
              <strong>Date of Delivery:</strong> {order.date_of_delivery}
              <br />
              <strong>Price:</strong> ${order.price}
              <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default PendingOrders;

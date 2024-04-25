// OrderButton.jsx

import React, { useState } from "react";
import axios from "axios";

const OrderButton = (props: {
  product_id: number;
  address_id: number;
  quantity: number;
  cash_on_delivery: boolean;
  price: number;
}) => {
  const handleOrderProduct = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/order-the-product",
        {
          product_id: props.product_id,
          address_id: props.address_id,
          quantity: props.quantity,
          cash_on_delivery: props.cash_on_delivery,
          price: props.price,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      alert("Order placed successfully!");
    } catch (error: any) {
      console.error("Error placing order:", error.message);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <button
      onClick={handleOrderProduct}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Order Now
    </button>
  );
};

export default OrderButton;

"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import UserNav from "@/components/UserNav";

const Payment = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false); // State to track loading state

  const handleMakePayment = async (orderId: number) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:5000/make-payment",
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert(response.data);
      router.push("/past-orders");
    } catch (error: any) {
      alert("Error making payment");
      router.push("/past-orders");
    } finally {
      setLoading(false); // Set loading state back to false after payment completes
    }
  };

  const handlePaymentButtonClick = () => {
    const orderId = parseInt(params.slug);
    if (!isNaN(orderId)) {
      handleMakePayment(orderId);
    }
  };

  return (
    <>
      <UserNav />
      <div className="max-w-md min-h-screen mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
        <p className="text-gray-600">Order ID: {params.slug}</p>
        <button
          onClick={handlePaymentButtonClick}
          disabled={loading}
          className={`bg-blue-500 text-white px-4 py-2 rounded-md mt-4 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          {loading ? "Processing..." : "Make Payment"}
        </button>
      </div>
    </>
  );
};

export default Payment;

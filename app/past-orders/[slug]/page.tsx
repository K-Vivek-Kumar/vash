"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useToken from "@/components/useToken";

const Payment = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const { token } = useToken();
  const [loading, setLoading] = React.useState(false); // State to track loading state

  const handleMakePayment = async (orderId: number) => {
    try {
      setLoading(true); // Set loading state to true during payment process
      const response = await axios.post(
        "http://127.0.0.1:5000/make-payment",
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert(response.data); // Handle success message
      // Redirect or show success message to user
    } catch (error: any) {
      console.error("Error making payment:", error.message);
      // Handle error (e.g., show error message)
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
    <div>
      <h2>Payment Details</h2>
      <p>Order ID: {params.slug}</p>
      <button
        onClick={handlePaymentButtonClick}
        disabled={loading} // Disable button during payment process
      >
        {loading ? "Processing..." : "Make Payment"}
      </button>
    </div>
  );
};

export default Payment;

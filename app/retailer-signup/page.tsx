"use client";

import { useState } from "react";

const RetailerSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    address: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignup = async () => {
    const { name, email, password, phoneNo, address } = formData;

    try {
      const requestBody = {
        name,
        email,
        password,
        phoneNo,
        address,
      };

      const response = await fetch("http://127.0.0.1:5000/retailer-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.text();
        alert(data);
      } else {
        throw new Error("Signup request failed");
      }
    } catch (error: any) {
      console.error("Error during signup:", error.message);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Retailer Signup</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="phoneNo"
        placeholder="Phone Number"
        value={formData.phoneNo}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleInputChange}
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default RetailerSignup;

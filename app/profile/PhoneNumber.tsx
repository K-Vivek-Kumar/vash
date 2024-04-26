import React, { useState } from "react";
import axios from "axios";

const PhoneNumberUpdate: React.FC = () => {
  const [phoneNo, setPhoneNo] = useState("");

  const handlePhoneNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNo(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://127.0.0.1:5000/update-phone-number",
        { phoneNo },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Phone Number Updated");
    } catch (error: any) {
      console.error("Error updating phone number:", error.message);
      alert("Failed to update phone number. Please try again.");
    }
  };

  return (
    <div>
      <h2>Update Phone Number</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="phoneNo">New Phone Number:</label>
        <input
          type="text"
          id="phoneNo"
          value={phoneNo}
          onChange={handlePhoneNoChange}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default PhoneNumberUpdate;

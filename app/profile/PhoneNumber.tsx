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
    <div className="w-full bg-white shadow-md rounded px-8 py-6 mb-8">
      <h2 className="text-3xl font-semibold mb-4">Update Phone Number</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="phoneNo" className="block text-gray-700">
          New Phone Number:
        </label>
        <input
          type="text"
          id="phoneNo"
          value={phoneNo}
          onChange={handlePhoneNoChange}
          required
          className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default PhoneNumberUpdate;

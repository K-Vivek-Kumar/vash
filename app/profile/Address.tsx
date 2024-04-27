"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddressSelector = () => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [newAddress, setNewAddress] = useState({
    address: "",
    city: "",
    postal_code: "",
  });

  const router = useRouter();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/address", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAddresses(response.data.Addresses);
      } catch (error: any) {
        console.error("Error fetching addresses:", error.message);
        router.push("/");
      }
    };

    fetchAddresses();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleAddAddress = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/add-address",
        newAddress,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Done! try reloading");
      router.refresh();
    } catch (error: any) {
      alert("Error");
      router.push("/profile");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white shadow-md rounded px-8 py-6 mb-8">
          <h2 className="text-3xl font-semibold mb-4">All Addresses</h2>
          {addresses.length > 0 ? (
            <ul>
              {addresses.map((address) => (
                <li key={address.id}>
                  {address.address}, {address.city}, {address.postal_code}
                </li>
              ))}
            </ul>
          ) : (
            <p>No addresses found.</p>
          )}
        </div>

        <div className="max-w-md w-full bg-white shadow-md rounded px-8 py-6 mb-8">
          <h2 className="text-3xl font-semibold mb-4">Add Address</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={newAddress.address}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={newAddress.city}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="postal_code"
              placeholder="Postal Code"
              value={newAddress.postal_code}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddAddress}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Address
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressSelector;

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
      if (response.status) {
        router.refresh();
      }
    } catch (error: any) {
      console.error("Error adding address:", error.message);
    }
  };

  return (
    <div>
      <h2>All Addresses</h2>
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

      <h2>Add Address</h2>
      <div>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newAddress.address}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={newAddress.city}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="postal_code"
          placeholder="Postal Code"
          value={newAddress.postal_code}
          onChange={handleInputChange}
        />
        <button onClick={handleAddAddress}>Add Address</button>
      </div>
    </div>
  );
};

export default AddressSelector;

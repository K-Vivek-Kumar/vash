// AddressSelector.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const AddressSelector = ({
  onSelectAddress,
}: {
  onSelectAddress: (addressId: number) => void;
}) => {
  const [addresses, setAddresses] = useState<any[]>([]);

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

  const handleAddressSelect = (addressId: number) => {
    onSelectAddress(addressId);
  };

  return (
    <div>
      <h2>Select Address</h2>
      <select onChange={(e) => handleAddressSelect(parseInt(e.target.value))}>
        <option value="">Select an address</option>
        {addresses.map((address) => (
          <option key={address.id} value={address.id}>
            {address.address}, {address.city}, {address.postal_code}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddressSelector;

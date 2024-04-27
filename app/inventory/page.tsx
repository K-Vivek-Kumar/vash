"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import RetailerNavbar from "@/components/RetailerNav";
import { useRouter } from "next/navigation";
import RetailerOrders from "./Orders";
import ActivateProductButton from "./Activate";

interface Item {
  id: number;
  name: string;
  quantity: number;
  category: string;
  sub_category: string;
  company: string;
  description: string;
  price: number;
  discount: number;
  active: boolean;
}

const InventoryTable = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/inventory", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setInventoryData(response.data.items);
      } catch (error: any) {
        console.error("Error fetching inventory:", error.message);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div className="min-h-screen">
      <RetailerNavbar />
      <h1 className="text-2xl font-bold text-center my-8">Inventory</h1>
      <div className="container mx-auto overflow-x-scroll">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Subcategory</th>
              <th className="py-2 px-4">Company</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Discount</th>
              <th className="py-2 px-4">Active</th>
              <th className="py-2 px-4">Add Images</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((item: Item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.quantity}</td>
                <td className="py-2 px-4">{item.category}</td>
                <td className="py-2 px-4">{item.sub_category}</td>
                <td className="py-2 px-4">{item.company}</td>
                <td className="py-2 px-4">{item.description}</td>
                <td className="py-2 px-4">{item.price}</td>
                <td className="py-2 px-4">{item.discount}</td>
                <td className="py-2 px-4">
                  {item.active ? "Yes" : "No"}
                  {item.active ? (
                    "Activated"
                  ) : (
                    <ActivateProductButton productId={item.id} />
                  )}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => {
                      router.push(`/products/${item.id}/image-upload`);
                    }}
                    className="bg-blue-700 text-white p-1 rounded-md"
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <RetailerOrders />
    </div>
  );
};

export default InventoryTable;

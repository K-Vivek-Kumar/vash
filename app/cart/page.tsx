"use client";

import { useEffect, useState } from "react";
import useToken from "@/app/useToken";
import axios from "axios";
import UserNav from "@/components/UserNav";

// Define a type for the cart item structure
interface CartItem {
  name: string;
  category: string;
  sub_category: string;
  company: string;
  description: string;
  price: number;
  discount: number;
  quantity: number;
}

const Cart = () => {
  const { token } = useToken();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.data.Items) {
          throw new Error("No items in the cart");
        }
        console.log(response.data.Items);
        const items: CartItem[] = response.data.Items.map((item: any) => ({
          name: item.name,
          category: item.category,
          sub_category: item.sub_category,
          company: item.company,
          description: item.description,
          price: item.price,
          discount: item.discount,
          quantity: item.quantity,
        }));

        setCartItems(items);
      } catch (error: any) {
        console.error("Error fetching cart items:", error.message);
      }
    };

    if (token) {
      fetchCartItems();
    }
  }, [token]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <UserNav />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-lg">Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item: CartItem, index: number) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 mb-4"
              >
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="mb-2">Category: {item.category}</p>
                <p className="mb-2">Description: {item.description}</p>
                <p className="mb-2">Price: ${item.price}</p>
                <p className="mb-2">Quantity: {item.quantity}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

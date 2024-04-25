"use client";

import { useEffect, useState } from "react";
import useToken from "@/components/useToken";
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
    <div>
      <UserNav />
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item: CartItem, index: number) => (
            <div key={index}>
              <h3>{item.name}</h3>
              <p>Category: {item.category}</p>
              <p>Description: {item.description}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;

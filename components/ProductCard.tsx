"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductCard = (props: { id: number; price: number; name: string }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/products/${props.id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        fetchImageUrls(props.id);
      } catch (error: any) {
        console.error("Error fetching product:", error.message);
      }
    };
    const fetchImageUrls = async (productId: number) => {
      try {
        const imageResponse = await fetch(
          `http://127.0.0.1:5000/image/${productId}`
        );
        if (!imageResponse.ok) {
          throw new Error("Failed to fetch product images");
        }
        const imageData = await imageResponse.json();
        console.log(imageData);
        setImageUrls(imageData.images);
      } catch (error: any) {
        console.error("Error fetching product images:", error.message);
      }
    };

    fetchProduct();
  }, [props.id]);
  return (
    <div
      className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden cursor-pointer"
      onClick={() => router.push(`/products/${props.id}`)}
    >
      <div
        className="flex items-end justify-end h-56 w-full bg-cover"
        style={{
          backgroundImage: `url('http://127.0.0.1:5000${imageUrls[0]}')`,
        }}
      >
        <button className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
          <svg
            className="h-5 w-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </button>
      </div>
      <div className="px-5 py-3">
        <h3 className="text-gray-700 uppercase">{props.name}</h3>
        <span className="text-gray-500 mt-2">${props.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;

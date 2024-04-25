"use client";

import UserNav from "@/components/UserNav";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

type product = {
  id: number;
  name: string;
  price: string;
  description: string;
};

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page: Number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/products?page=${page}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data.products);
      setHasNextPage(data.has_next);
      setHasPrevPage(data.has_prev);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handlePrevPage = () => {
    if (hasPrevPage) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <UserNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Products</h1>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product: product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={parseInt(product.price)}
            />
          ))}
        </div>
        <div className="mt-12 flex justify-evenly items-center cursor-pointer">
          <button
            onClick={handlePrevPage}
            disabled={!hasPrevPage}
            className="bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Previous
          </button>
          <span className="text-gray-600 text-lg">Page {currentPage}</span>
          <button
            onClick={handleNextPage}
            disabled={!hasNextPage}
            className="cursor-pointer disabled:cursor-not-allowed bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;

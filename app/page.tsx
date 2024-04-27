"use client";

import { useState, useEffect } from "react";
import UserNav from "@/components/UserNav";
import ProductCard from "../components/ProductCard";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
};

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, searchQuery]);

  const fetchProducts = async (page: number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/products?page=${page}&q=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data.products);
      setHasNextPage(data.has_next);
      setHasPrevPage(data.has_prev);
    } catch (error: any) {
      alert("Error fetching products");
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

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when performing a new search
    fetchProducts(1); // Fetch products for the first page with the new search query
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <UserNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Products</h1>

        <form onSubmit={handleSearch} className="mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or description"
            className="p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Search
          </button>
        </form>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
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

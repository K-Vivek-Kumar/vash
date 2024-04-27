"use client";

import React, { useState } from "react";
import axios from "axios";
import useToken from "@/app/useToken";
import RetailerNavbar from "@/components/RetailerNav";
import { useRouter } from "next/navigation";

const FileUpload = ({ params }: { params: { slug: string } }) => {
  const { token } = useToken();
  const [productID, setProductID] = useState(params.slug);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleProductIDChange = (e: any) => {
    setProductID(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!productID || !file) {
      setMessage("Please provide a product ID and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("product_id", productID);
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/uploads",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);
      router.push("/inventory");
    } catch (error) {
      setMessage("Error uploading file. Please try again.");
    }
  };

  return (
    <>
      <RetailerNavbar />
      <div className="py-16 px-4">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Upload Image</h2>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-4"
          >
            <div>
              <label htmlFor="product_id" className="block mb-2">
                Product ID:
              </label>
              <input
                type="text"
                id="product_id"
                name="product_id"
                value={productID}
                onChange={handleProductIDChange}
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="file" className="block mb-2">
                Select Image:
              </label>
              <input
                type="file"
                id="file"
                name="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Upload
            </button>

            {message && <p>{message}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default FileUpload;

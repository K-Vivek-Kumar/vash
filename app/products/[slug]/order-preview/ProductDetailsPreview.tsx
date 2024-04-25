import React from "react";
import QuantityInput from "./QuantityInput";

const ProductDetailsPreview = ({
  imageUrls,
  name,
  brand,
  price,
  description,
  category,
  subCategory,
  quantityChange,
  discount,
}: {
  imageUrls: string[];
  name: string;
  brand: string;
  price: number;
  description: string;
  category: string;
  subCategory: string;
  quantityChange: (value: number) => void;
  discount: number;
}) => {
  return (
    <div className="max-w-lg mx-auto">
      <div className="flex justify-center mb-4">
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={`http://127.0.0.1:5000${url}`}
            alt={`Product ${index}`}
            className="w-64 h-64 object-contain mr-4"
          />
        ))}
      </div>
      <h2 className="text-2xl font-bold mb-4">{name}</h2>
      <p className="text-gray-600 mb-2">{brand}</p>
      <p className="text-lg font-semibold text-blue-600 mb-2">
        ${price.toFixed(2)}{" "}
        {discount > 0 && (
          <span className="line-through">
            ${(price * (1 + discount)).toFixed(2)}
          </span>
        )}
      </p>
      <p className="text-sm text-gray-700 mb-4">{description}</p>
      <div className="flex items-center mb-4">
        <label htmlFor="quantity" className="mr-2">
          Quantity:
        </label>
        <QuantityInput onChange={quantityChange} />
      </div>
    </div>
  );
};

export default ProductDetailsPreview;

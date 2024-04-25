"use client";

import ProductPage from "@/components/EachProductPage";
import UserNav from "@/components/UserNav";
import useToken from "@/components/useToken";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductDetail = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const { token } = useToken();

  const [product, setProduct] = useState<any>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/products/${parseInt(params.slug)}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
        fetchImageUrls(parseInt(params.slug));
      } catch (error: any) {
        console.error("Error fetching product:", error.message);
      }
    };
    const fetchImageUrls = async (productId: number) => {
      try {
        const imageResponse = await fetch(
          `http://127.0.0.1:5000/images/${productId}`
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
  }, [params.slug]);

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/upload-cart",
        {
          product_id: parseInt(params.slug),
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error: any) {
      console.error("Error adding to cart:", error.message);
    }
  };

  const handleQuantityChange = (e: any) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <UserNav />
      <ProductPage
        imageUrls={imageUrls}
        name={product.name}
        brand={product.company}
        price={product.price}
        description={product.description}
        category={product.category}
        sub_category={product.sub_category}
        add_cart={handleAddToCart}
        discount={product.discount}
      />
    </>
  );
};

export default ProductDetail;

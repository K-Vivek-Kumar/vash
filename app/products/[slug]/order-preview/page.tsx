"use client";

import ProductPage from "@/components/EachProductPage";
import UserNav from "@/components/UserNav";
import useToken from "@/components/useToken";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductDetailsPreview from "./ProductDetailsPreview";
import AddressSelector from "./AddressDisplay";
import OrderButton from "./OrderButton";
import CashOnDeliveryCheckbox from "./CashOnDelivery";

const ProductDetail = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const { token } = useToken();

  const [product, setProduct] = useState<any>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [address, setAddress] = useState<number>(0);
  const [cashOnDelivery, setCashOnDelivery] = useState(false);

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

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <UserNav />
      <ProductDetailsPreview
        imageUrls={imageUrls}
        name={product.name}
        brand={product.company}
        price={product.price}
        description={product.description}
        category={product.category}
        subCategory={product.sub_category}
        quantityChange={handleQuantityChange}
        discount={product.discount}
      />
      <AddressSelector onSelectAddress={(addressId) => setAddress(addressId)} />
      <CashOnDeliveryCheckbox
        setTrueOrFalse={(val: boolean) => setCashOnDelivery(val)}
      />
      <OrderButton
        product_id={parseInt(params.slug)}
        address_id={address}
        quantity={quantity}
        cash_on_delivery={cashOnDelivery}
        price={parseFloat(
          (product.price * ((100 - product.discount) / 100)).toFixed(2)
        )}
      />
    </>
  );
};

export default ProductDetail;

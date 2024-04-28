import React from "react";

const ProductPage = (props: {
  discount: number;
  brand: string;
  price: number;
  imageUrls: string[];
  name: string;
  description: string;
  category: string;
  sub_category: string;
  add_cart: Function;
  product_checkout: Function;
}) => {
  return (
    <section className="overflow-hidden text-gray-600 body-font">
      <div className="container px-5 py-5 mx-auto">
        <div className="flex flex-wrap mx-auto lg:w-full">
          <div className="hidden grid-cols-1 grid-rows-12 gap-1 pr-4 lg:grid">
            {props.imageUrls.map((index) => (
              <img
                key={index}
                className="w-24 h-24 border-2 border-black rounded-md hover:border-gray-400 object-cover"
                src={`http://127.0.0.1:5000${index}`}
                alt={`Image ${index}`}
              />
            ))}
          </div>

          <div className="w-full lg:w-3/6 md:w-3/6">
            <img
              className="object-contain object-center w-full h-auto max-h-screen rounded"
              src={`http://127.0.0.1:5000${props.imageUrls[0]}`}
              alt="Main Image"
            />

            <div className="grid justify-center grid-cols-5 grid-rows-1 pt-4 lg:hidden">
              {props.imageUrls.map((index) => (
                <img
                  key={index}
                  className="w-12 h-12 border-2 border-black rounded-md justify-self-center hover:border-gray-400 object-cover"
                  src={`http://127.0.0.1:5000${index}`}
                  alt={`Image ${index}`}
                />
              ))}
            </div>
          </div>

          <div className="w-full mt-6 lg:w-2/6 md:w-3/6 lg:py-6 lg:mx-auto lg:mt-0">
            <div className="flex justify-between">
              <span className="mb-2 text-base font-semibold text-red-500">
                {props.category}
              </span>
              <span className="mb-2 text-base font-semibold text-red-500">
                {props.sub_category}
              </span>
            </div>
            <h1 className="mb-2 text-4xl font-bold text-black title-font">
              {props.name}
            </h1>
            <h2 className="mb-8 text-xl font-semibold text-black">
              {props.description}
            </h2>
            <h2 className="text-2xl font-semibold text-black title-font">
              ${" "}
              {(props.price * ((100 - props.discount) / 100))
                .toFixed(2)
                .toLocaleString()}
              <span className="ml-2 text-black line-through text-sm font-light">
                ${props.price}
              </span>
            </h2>
            <h4 className="text-black text-normal mb-8">
              Special Offer: {props.discount}%
            </h4>
            <span className="text-base text-black">
              Brand: <span className="font-bold">{props.brand}</span>
            </span>

            <button
              className="block w-full px-6 py-2 mx-auto my-8 text-white uppercase bg-black border border-black rounded-full hover:bg-white hover:text-black"
              onClick={() => props.add_cart()}
            >
              Add to Cart
            </button>
            <button
              className="block w-full px-6 py-2 mx-auto my-8 text-white uppercase bg-black border border-black rounded-full hover:bg-white hover:text-black"
              onClick={() => props.product_checkout()}
            >
              Order Now
            </button>

            <hr className="my-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;

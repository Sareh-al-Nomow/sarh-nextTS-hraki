"use client";

import Image from "next/image";

type Product = {
  title: string;
  image: string;
  price: number;
  reviews: number;
  rating: number;
};

const products: Product[] = [
  {
    title: "Organize Basic Set (Walnut)",
    image: "/image/categories/jewellery.jpg",
    price: 149,
    reviews: 38,
    rating: 5,
  },
  {
    title: "Organize Pen Holder",
    image: "/image/categories/jewellery.jpg",
    price: 15,
    reviews: 18,
    rating: 5,
  },
  {
    title: "Organize Sticky Note Holder",
    image: "/image/categories/jewellery.jpg",
    price: 15,
    reviews: 14,
    rating: 5,
  },
  {
    title: "Organize Phone Holder",
    image: "/image/categories/jewellery.jpg",
    price: 15,
    reviews: 21,
    rating: 4,
  },
];

export default function ProductList() {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="aspect-square w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="absolute right-4 top-4">
                <button className="rounded-full bg-white/90 p-2 shadow-sm backdrop-blur hover:bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.title}
                  </h3>
                  <p className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </p>
                </div>

                <div className="mt-2 flex items-center">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${
                          i < product.rating ? "text-amber-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.965a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.384 2.46a1 1 0 00-.364 1.118l1.286 3.965c.3.921-.755 1.688-1.538 1.118l-3.384-2.46a1 1 0 00-1.175 0l-3.384 2.46c-.783.57-1.838-.197-1.538-1.118l1.286-3.965a1 1 0 00-.364-1.118L2.049 9.392c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.965z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    {product.reviews} reviews
                  </span>
                </div>

                <button className="mt-4 w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-gray-700">
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash, ShoppingCart } from "lucide-react";

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function WishlistPage() {
  // Fake Wishlist Data (Replace with API Data in Future)
  const [wishlist, setWishlist] = useState<WishlistItem[]>([
    {
      id: 1,
      name: "Asgaard Sofa",
      price: 599,
      image: "/Asgaard sofa 1.png",
    },
    {
      id: 2,
      name: "Wooden Chair",
      price: 199,
      image: "/SJP_0825  1.png",
    },
    {
      id: 3,
      name: "Modern Table",
      price: 299,
      image: "/Reclaimed teak coffee table 1.png",
    },
  ]);

  // Remove Item from Wishlist
  const removeFromWishlist = (id: number) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FFF9E5] px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-[#738B6A] mb-8">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
              <Image src={item.image} alt={item.name} width={200} height={150} className="object-cover mb-3" />

              <h2 className="text-lg font-semibold text-[#738B6A]">{item.name}</h2>
              <p className="text-gray-700 font-medium">${item.price}</p>

              <div className="mt-4 flex space-x-3">
                <Link href="/CartPage">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-[#738B6A] text-white rounded-lg hover:bg-[#CFDAC8] transition">
                    <ShoppingCart size={18} />
                    <span>Add to Cart</span>
                  </button>
                </Link>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  <Trash size={18} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
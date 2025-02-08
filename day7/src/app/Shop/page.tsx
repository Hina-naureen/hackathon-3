"use client";

import React, { useState, useEffect } from "react";

import { allProducts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Product } from "../../../type/products";
import Image from "next/image";
import { addToCart } from "../actions/actions";
import Swal from "sweetalert2";
import { ShoppingCart } from "lucide-react";
import { client } from "@/sanity/lib/client";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts: Product[] = await client.fetch(allProducts);

      // ✅ Make sure "isNew" and "isSoldOut" are properly assigned
      const updatedProducts = fetchedProducts.map((product, index) => ({
        ...product,
        isNew: index % 2 === 0, // Every alternate product is "New"
        isSoldOut: false, // Default false
      }));

      // ✅ Ensure at least one product is marked as "Sold Out"
      if (updatedProducts.length > 0) {
        const lastIndex = updatedProducts.length - 1;
        updatedProducts[lastIndex] = { ...updatedProducts[lastIndex], isSoldOut: true };
      }

      setProducts(updatedProducts);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();

    if (product.isSoldOut) {
      Swal.fire({
        icon: "error",
        title: "Sold Out",
        text: "This product is no longer available",
      });
      return;
    }

    Swal.fire({
      position: "top-right",
      icon: "success",
      title: `${product.name} added to cart`,
      showConfirmButton: false,
      timer: 1000,
    });

    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Cart Link (Top-Right) */}
      <header className="flex justify-end p-6">
        <Link href="/CartPage">
          <div className="flex items-center space-x-2 text-[#738B6A] px-6 py-3 rounded-lg shadow-sm hover:bg-[#CFDAC8] transition">
            <ShoppingCart size={20} />
            <span className="font-semibold">Cart</span>
          </div>
        </Link>
      </header>

      {/* ✅ Product Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-[#738b6a] mb-10">
          ArtWill Furniture
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link key={product._id} href={`/product/${product.slug?.current || "#"}`}>
              <div className="border rounded-lg p-6 shadow-lg bg-white flex flex-col items-center min-h-[400px] 
              transform transition duration-300 hover:scale-[1.03] hover:shadow-2xl relative">

                {/* ✅ "New" Badge */}
                {product.isNew && !product.isSoldOut && (
                  <span className="absolute top-4 left-4 bg-[#7269e3] text-white px-3 py-1 text-xs font-bold rounded-full">
                    NEW
                  </span>
                )}

                {/* ✅ "Sold Out" Badge */}
                {product.isSoldOut && (
                  <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-full">
                    SOLD OUT
                  </span>
                )}

               
          

                {/* ✅ Product Image - Full View */}
                {product.image && (
                  <div className="relative w-64 h-64 mb-4">
                    <Image
                      src={urlFor(product.image).url()}
                      alt={product.name}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-md"
                    />
                  </div>
                )}


                {/* ✅ Product Details */}
                <h2 className="text-lg font-semibold text-center">{product.name}</h2>
                <p className="text-gray-600 text-sm text-center line-clamp-2">{product.description}</p>
                <p className="text-lg font-bold text-green-600 mt-2">PKR {product.price}</p>

                {/* ✅ Add to Cart Button */}
                <button
                  className={`mt-auto text-white font-semibold py-2 px-6 rounded-lg shadow-md flex items-center space-x-2 
                  transition-transform duration-300 ${
                    product.isSoldOut 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-gradient-to-r from-[#Cfdac8] to-[#738b6a] hover:scale-105 hover:shadow-lg"
                  }`}
                  onClick={(e) => handleAddToCart(e, product)}
                  disabled={product.isSoldOut}
                >
                  <ShoppingCart size={18} />
                  <span>{product.isSoldOut ? "Unavailable" : "Add To Cart"}</span>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
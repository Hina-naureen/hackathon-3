"use client";

import React, { useEffect, useState } from "react";
import { getCartItems, removeFromCart, updateCartQuantity } from "../actions/actions";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Product } from "../../../type/products";
import { Trash } from "lucide-react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const items = getCartItems();
    setCartItems(items);
    calculateTotal(items);
  }, []);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        const updatedCart = getCartItems();
        setCartItems(updatedCart);
        calculateTotal(updatedCart);
        Swal.fire("Removed!", "Item has been removed from your cart.", "success");
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity);
    const updatedCart = getCartItems();
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
  };

  const calculateTotal = (items: Product[]) => {
    const total = items.reduce((acc, item) => acc + item.price * (item.inventory || 1), 0);
    setTotalPrice(total);
  };

  const handleCheckout = () => {
    Swal.fire({
      title: "Proceeding to Checkout",
      text: "Your order is being processed!",
      icon: "success",
    }).then(() => {
      router.push("/checkout");
    });
  };

  return (
    <div className="p-4 md:p-6 bg-white min-h-screen flex flex-col items-center">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-6 md:mb-8 text-[#738b6a] text-center">
        Shopping Cart
      </h1>

      <div className="w-full max-w-6xl space-y-4 md:space-y-6">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item._id || Math.random()}
              className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-4 md:p-5 rounded-xl shadow-md space-y-3 md:space-y-0"
            >
              <div className="flex items-center space-x-3 md:space-x-6 w-full md:w-auto">
                {item.image?.asset?._ref ? (
                  <Image
                    src={urlFor(item.image).url()}
                    className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-lg"
                    alt={item.name}
                    width={64}
                    height={64}
                  />
                ) : (
                  <Image
                    src="/placeholder-image.png"
                    className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-lg"
                    alt="No Image Available"
                    width={64}
                    height={64}
                  />
                )}
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-[#738b6a]">{item.name}</h2>
                  <p className="text-gray-500 mt-1 text-sm md:text-base">Price: Rs {item.price}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 w-full md:w-auto justify-between">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                    onClick={() => handleQuantityChange(item._id, Math.max(1, (item.inventory || 1) - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 text-sm md:text-base">{item.inventory || 1}</span>
                  <button
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                    onClick={() => handleQuantityChange(item._id, (item.inventory || 1) + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[#738b6a] text-lg text-center">Your cart is empty.</p>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="mt-8 w-full max-w-6xl bg-white p-5 md:p-6 rounded-xl shadow-lg border border-[#738b6a]">
          <div className="flex flex-col md:flex-row justify-between items-center text-lg md:text-xl font-semibold space-y-3 md:space-y-0">
            <span>Total:</span>
            <span className="text-[#738b6a] text-lg md:text-xl">Rs {totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-5 w-full px-4 py-3 bg-[#738b6a] text-white text-lg font-semibold rounded-lg hover:bg-opacity-80 transition"
          >
            Proceed to Checkout
          </button>

          <Link href="/shop" className="mt-5 inline-block text-[#738b6a] underline text-center md:text-left w-full">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;

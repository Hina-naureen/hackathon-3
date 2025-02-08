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
    <div className="p-6 bg-white min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-extrabold mb-8 text-[#738b6a]">Shopping Cart</h1>
      <div className="w-full max-w-4xl space-y-6">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item._id || Math.random()} className="flex items-center justify-between bg-gray-100 p-5 rounded-xl shadow-md">
              <div className="flex items-center">
                {item.image?.asset?._ref ? (
                  <Image
                    src={urlFor(item.image).url()}
                    className="w-16 h-16 object-cover rounded-lg"
                    alt={item.name}
                    width={64}
                    height={64}
                  />
                ) : (
                  <Image
                    src="/placeholder-image.png"
                    className="w-16 h-16 object-cover rounded-lg"
                    alt="No Image Available"
                    width={64}
                    height={64}
                  />
                )}
                <div className="ml-6">
                  <h2 className="text-xl font-semibold text-[#738b6a]">{item.name}</h2>
                  <p className="text-gray-500 mt-1">Price: Rs {item.price}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                    onClick={() => handleQuantityChange(item._id, Math.max(1, (item.inventory || 1) - 1))}
                  >
                    -
                  </button>
                  <span className="px-4">{item.inventory || 1}</span>
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
        <div className="mt-10 w-full max-w-4xl bg-white p-6 rounded-xl shadow-lg border border-[#738b6a]">
          <div className="flex justify-between items-center text-xl font-semibold">
            <span>Total:</span>
            <span className="text-[#738b6a]">Rs {totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 w-full px-4 py-3 bg-[#738b6a] text-white text-lg font-semibold rounded-lg hover:bg-opacity-80 transition"
          >
            Proceed to Checkout
          </button>

          <Link href="/shop" className="mt-6 inline-block text-[#738b6a] underline">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;

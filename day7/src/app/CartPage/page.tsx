"use client";

import React, { useEffect, useState } from "react";
import { getCartItems, removeFromCart, updateCartQuantity } from "../actions/actions";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import Link from "next/link";
import { Product } from "../../../type/products";


const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    setCartItems(getCartItems());
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
        setCartItems(getCartItems());
        Swal.fire("Removed!", "Item has been removed from your cart.", "success");
      }
    });
  };

  // const handleQuantityChange = (id: string, quantity: number) => {
  //   updateCartQuantity(id, quantity);
  //   setCartItems(getCartItems());
  // };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.inventory, 0);
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
            <div key={item._id} className="flex items-center justify-between bg-gray-100 p-5 rounded-xl shadow-md">
              <div className="flex items-center">
              {item.image && (
                  <Image
                    src={urlFor(item.image).url()}
                    className="w-16 h-16 object-cover rounded-lg"
                    alt="image"
                    width={500}
                    height={500}
                  />
                )}
                <div className="ml-6">
                  <h2 className="text-xl font-semibold text-[#738b6a]">{item.name}</h2>
                  <p className="text-gray-500 mt-1">Price: Rs {item.price}</p>
                </div>
              </div>
              <button onClick={() => handleRemove(item._id)} className="text-red-600 hover:text-red-800">
                <Trash size={20} />
              </button>
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
            <span className="text-[#738b6a]">Rs {calculateTotal().toFixed(2)}</span>
          </div>
          <button onClick={handleCheckout} className="mt-6 w-full px-4 py-3 bg-[#738b6a] text-white text-lg font-semibold rounded-lg hover:bg-opacity-80 transition">
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
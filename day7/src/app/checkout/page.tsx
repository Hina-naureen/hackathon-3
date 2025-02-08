"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCartItems } from "@/app/actions/actions";
import { urlFor } from "@/sanity/lib/image";
import { CgChevronRight } from "react-icons/cg";
import { Product } from "../../../type/products";
import { client } from "@/sanity/lib/client";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems();
        setCartItems(items || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
    const appliedDiscount = localStorage.getItem("appliedDiscount");
    setDiscount(appliedDiscount ? Number(appliedDiscount) : 0);
  }, []);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.inventory, 0);
  const total = Math.max(subtotal - discount, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors: Record<string, boolean> = {};
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key as keyof typeof formValues].trim()) {
        errors[key] = true;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      setMessage("Please fill in all required fields.");
      setMessageType("error");
      
      return;
    }

    const orderData = {
      _type: "order",
      ...formValues,
      cartItems: cartItems.map((item) => ({
        _type: "reference",
        _ref: item._id,
      })),
      total,
      discount,
      orderDate: new Date().toISOString(),
    };

    try {
      await client.create(orderData);
      localStorage.removeItem("appliedDiscount");
      setMessage("Your order has been placed successfully!");
      setMessageType("success");
      
      setCartItems([]);
      setFormValues({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zipCode: "",
        phone: "",
        email: "",
      });
    } catch (error) {
      console.error("Error creating order:", error);
      setMessage("Failed to place the order. Please try again.");
      setMessageType("error");
      
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 py-4">
          <Link href="/CartPage" className="text-[#738b6a] hover:text-black transition text-sm">
            CartPage
          </Link>
          <CgChevronRight className="w-4 h-4 text-[#738b6a]" />
          <span className="text-sm text-[#738b6a]">Checkout</span>
        </nav>

        {/* Success or Error Message */}
        {message && (
          <div
            className={`p-3 mb-4 text-center rounded-lg shadow-md ${
              messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-[#738b6a] rounded-lg p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-[#738b6a]">Order Summary</h2>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 py-3 border-b border-[#738b6a]">
                  <div className="w-16 h-16 rounded overflow-hidden">
                  {item.image && (
                  <Image
                    src={urlFor(item.image).url()}
                    className="w-16 h-16 object-cover rounded-lg"
                    alt="image"
                    width={500}
                    height={500}
                  />
                )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-[#738b6a]">{item.name}</h3>
                    <p className="text-xs text-gray-600">Quantity: {item.inventory}</p>
                  </div>
                  <p className="text-sm font-medium text-[#738b6a]">${item.price * item.inventory}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Your cart is empty.</p>
            )}
            <div className="text-right pt-4">
              <p className="text-sm text-[#738b6a]">Subtotal: <span className="font-medium">${subtotal}</span></p>
              <p className="text-sm text-[#738b6a]">Discount: <span className="font-medium">-${discount}</span></p>
              <p className="text-lg font-semibold text-[#738b6a]">Total: ${total.toFixed(2)}</p>
            </div>
          </div>

          <div className="bg-white border border-[#738b6a] rounded-lg p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-[#738b6a]">Billing Information</h2>
            {Object.keys(formValues).map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-[#738b6a]">
                  {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </label>
                <input
                  id={field}
                  placeholder={`Enter your ${field}`}
                  value={formValues[field as keyof typeof formValues]}
                  onChange={handleInputChange}
                  className={`border w-full p-2 mt-1 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#738b6a] ${
                    formErrors[field] ? "border-red-500" : "border-[#738b6a]"
                  }`}
                />
                {formErrors[field] && (
                  <p className="text-sm text-red-500">{`${field.replace(/([A-Z])/g, " $1")} is required.`}</p>
                )}
              </div>
            ))}
            <button 
              className="w-full h-12 bg-[#738b6a] hover:bg-opacity-80 text-white rounded-lg shadow-md transition-all" 
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

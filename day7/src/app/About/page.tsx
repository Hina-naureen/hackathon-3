"use client";

import React from "react";
import Image from "next/image";

export default function About() {
  return (
    <div className="w-full min-h-screen bg-[#FFFFFF] px-4 md:px-0 flex flex-col items-center">
      {/* ✅ Header Section */}
      <div className="w-full bg-[#F4F4F4] py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-medium text-[#738b6a]">About Us</h1>
        <div className="text-sm md:text-lg font-medium text-[#738b6a] mt-2">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span className="font-light">About</span>
        </div>
      </div>

      {/* ✅ About Content Section */}
      <div className="w-full max-w-6xl py-12 flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* ✅ Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/Granite dining table with dining chair 1.png"
            alt="About Us"
            width={500}
            height={400}
            className="rounded-lg shadow-lg object-cover"
            priority
          />
        </div>

        {/* ✅ Text Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#738b6a]">
            Who We Are
          </h2>
          <p className="text-[#666] mt-4 leading-relaxed">
            Welcome to our furniture store, where quality meets craftsmanship.
            Our mission is to bring you beautifully designed and carefully crafted
            furniture pieces that elevate your living spaces.
          </p>
          <p className="text-[#666] mt-4 leading-relaxed">
            We focus on sustainable materials, modern aesthetics, and top-notch
            customer service. Your home deserves the best, and we are here to
            make it happen.
          </p>
          <p className="text-[#666] mt-4 leading-relaxed">
            Whether you are looking for timeless classics or trendy designs, we
            have something for every style and preference.
          </p>

          <button className="mt-6 px-6 py-3 bg-[#738b6a] text-white rounded-md shadow-md hover:bg-opacity-90 transition">
            Explore Our Collection
          </button>
        </div>
      </div>

      {/* ✅ Why Choose Us Section */}
      <div className="w-full max-w-6xl py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#738b6a]">Why Choose Us?</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon="🌱"
            title="Sustainable Materials"
            description="Our furniture is crafted with eco-friendly and durable materials, ensuring longevity and sustainability."
          />
          <FeatureCard
            icon="🎨"
            title="Modern Designs"
            description="We blend contemporary aesthetics with functionality to create furniture that enhances your home."
          />
          <FeatureCard
            icon="💖"
            title="Customer Satisfaction"
            description="We prioritize customer satisfaction by providing top-quality products and exceptional service."
          />
        </div>
      </div>
    </div>
  );
}

// ✅ Feature Card Component
function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="p-6 bg-[#F9F9F9] rounded-lg shadow-md flex flex-col items-center">
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-4 text-lg font-semibold text-[#738b6a]">{title}</h3>
      <p className="text-sm text-gray-600 mt-2 text-center">{description}</p>
    </div>
  );
}
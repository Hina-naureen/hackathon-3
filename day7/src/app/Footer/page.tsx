"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#CFDAC8] py-8 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Address */}
          <div className="text-gray-600 text-sm">
            <p>400 University Drive Suite 200 Coral Gables,</p>
            <p>FL 33134 USA</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-[#738B6A] text-sm font-medium mb-3">Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-800 hover:text-gray-900 transition">Home</Link></li>
              <li><Link href="/Shop" className="text-gray-800 hover:text-gray-900 transition">Shop</Link></li>
              <li><Link href="/about" className="text-gray-800 hover:text-gray-900 transition">About</Link></li>
              <li><Link href="/contact" className="text-gray-800 hover:text-gray-900 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-[#738B6A] text-sm font-medium mb-3">Help</h3>
            <ul>
              <li><Link href="/payment-options" className="text-gray-800 hover:text-gray-900 transition">Payment Options</Link></li>
              <li><Link href="/returns" className="text-gray-800 hover:text-gray-900 transition">Return</Link></li>
              <li><Link href="/privacy" className="text-gray-800 hover:text-gray-900 transition">Privacy Policies</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[#738B6A] text-sm font-medium mb-3">Newsletter</h3>
            <div className="flex items-center">
              <input type="email" placeholder="Enter Your Email" className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none" />
              <button className="bg-[#738B6A] text-white px-4 py-2 rounded-r-md hover:bg-[#Cfdac8] transition">Subscribe</button>
            </div>
          </div>
        </div>

        
      </div>
    </footer>
  );
}
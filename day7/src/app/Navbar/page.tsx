"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";


// ✅ HomePage Component
export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* ✅ Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all shadow-sm bg-[#CFDAC8]">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-black">Furniture</h1>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-10">
            <NavLinks />
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center space-x-5">
            <NavIcons />
            <button className="md:hidden p-2 text-[#738B6A]">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Floating Cart & Wishlist Icons (Always Visible) */}
      <div className="fixed bottom-5 right-6 flex flex-col space-y-4 z-50">
        <FloatingIcon href="/CartPage">
          <ShoppingCart size={28} />
        </FloatingIcon>
        <FloatingIcon href="/wishlist">
          <Heart size={28} />
        </FloatingIcon>
      </div>

      {/* ✅ New Arrivals Section (Yellow Background) */}
      <section className="flex flex-col md:flex-row items-center justify-center px-8 py-6 bg-[#FFF9E5] min-h-screen">
        <div className="w-full md:w-1/2">
          <Image
            src="/Rocket single seater 1.png"
            alt="New Arrival"
            width={600}
            height={500}
            className="object-cover mx-auto"
            priority
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left md:pl-10">
          <h2 className="text-lg font-medium text-[#738B6A]">New Arrivals</h2>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold text-black">
            Rocket Single Seater
          </h1>
          <Link
            href="/Shop"
            className="mt-6 inline-block border border-black py-3 px-10 text-black hover:bg-[#Cfdac8] hover:text-white transition"
          >
            Shop
          </Link>
        </div>
      </section>
    </div>
  );
}

// ✅ Floating Icon Component
interface FloatingIconProps {
  href: string;
  children: React.ReactNode;
}

function FloatingIcon({ href, children }: FloatingIconProps) {
  return (
    <Link href={href}>
      <div className="p-4 bg-[#738B6A] text-white rounded-full shadow-lg hover:bg-[#CFDAC8] transition transform hover:scale-110 flex items-center justify-center">
        {children}
      </div>
    </Link>
  );
}

// ✅ Navigation Links Component
function NavLinks() {
  return (
    <>
      <NavItem href="/" label="Home" />
      <NavItem href="/Shop" label="Shop" />
      <NavItem href="/About" label="About" />
      <NavItem href="/Contact" label="Contact" />
    </>
  );
}

// ✅ Single Navigation Item Component
interface NavItemProps {
  href: string;
  label: string;
}

function NavItem({ href, label }: NavItemProps) {
  return (
    <Link className="text-sm font-medium text-[#738B6A] hover:text-gray-700 transition" href={href}>
      {label}
    </Link>
  );
}

// ✅ Icons Component
function NavIcons() {
  return (
    <>
      <NavIcon href="/account">
        <User className="h-5 w-5" />
      </NavIcon>
      <NavIcon href="/search">
        <Search className="h-5 w-5" />
      </NavIcon>
      <NavIcon href="/wishlist">
        <Heart className="h-5 w-5" />
      </NavIcon>
      <NavIcon href="/CartPage">
        <ShoppingCart className="h-5 w-5" />
      </NavIcon>
    </>
  );
}

// ✅ Single Icon Component
interface NavIconProps {
  href: string;
  children: React.ReactNode;
}

function NavIcon({ href, children }: NavIconProps) {
  return (
    <Link href={href}>
      <button className="p-2 text-[#738B6A] hover:text-gray-700 transition">{children}</button>
    </Link>
  );
}
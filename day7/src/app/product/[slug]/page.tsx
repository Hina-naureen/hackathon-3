import { client } from "@/sanity/lib/client";
import { Product } from "../../../../type/products";
import { groq } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { FaShoppingCart, FaFacebook, FaTwitter, FaInstagram, FaHome, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import CartPage from "@/app/CartPage/page";


interface productPageProps {
  params : Promise<{slug : string}>
}

// ✅ Product Fetch Function
async function getProduct(slug: string): Promise<Product> {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
      _id,
      name,
      category,
      price,
      description,
      discountPercentage,
      isFeaturedProduct,
      stockLevel,
      image,
    }`,
    { slug }
  );
}

export default async function ProductPage({ params }: productPageProps) {
  const { slug } =await params;
  const product = await getProduct(slug);

  return (
    <div className="max-w-7xl mx-auto px-4">

      {/* ✅ Navbar */}
      <nav className="flex justify-between items-center py-4 border-b">
        <div className="text-xl font-bold">Furniture</div>
        <div className="flex gap-6">
          <Link href="/" className="text-gray-600 hover:text-black"><FaHome size={20} /></Link>
          <Link href="/About" className="text-gray-600 hover:text-black"><FaInfoCircle size={20} /></Link>
          <Link href="/Contact" className="text-gray-600 hover:text-black"><FaEnvelope size={20} /></Link>
          <Link href="/CartPage" className="text-gray-600 hover:text-black"><FaShoppingCart size={20} /></Link>
        </div>
      </nav>

      {/* ✅ Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-10">
        <div className="flex flex-col items-center">
          {product.image && (
            <Image
              src={urlFor(product.image).url()}
              alt={product.name}
              width={400}
              height={400}
              className="h-auto w-full object-cover rounded-md"
            />
          )}

          {/* ✅ Colors Below Image */}
          <div className="mt-6">
            <span className="text-gray-500 font-poppins text-[14px] block mb-[10px]">
              Color:
            </span>
            <div className="flex gap-[10px]">
              <div className="w-[30px] h-[30px] bg-[#816DFA] rounded-full"></div>
              <div className="w-[30px] h-[30px] bg-black rounded-full"></div>
              <div className="w-[30px] h-[30px] bg-[#CDBA7B] rounded-full"></div>
            </div>
          </div>

          {/* ✅ Sizes Below Image */}
          <div className="mt-4">
            <span className="text-gray-500 font-poppins text-[14px] block mb-[10px]">
              Size:
            </span>
            <div className="flex gap-[10px]">
              {["L", "XL", "XS"].map((size, i) => (
                <div
                  key={i}
                  className={`w-[30px] h-[30px] ${
                    i === 0 ? "bg-[#FBEBB5]" : "bg-[#FAF4F4]"
                  } flex justify-center items-center rounded-[5px]`}
                >
                  <span className="text-[13px] font-light">{size}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ Social Media Below Image */}
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" className="text-blue-600"><FaFacebook size={24} /></a>
            <a href="https://twitter.com" target="_blank" className="text-blue-400"><FaTwitter size={24} /></a>
            <a href="https://instagram.com" target="_blank" className="text-pink-500"><FaInstagram size={24} /></a>
            <li>
              <Link href="/CartPage" className="hover:underline text-lg font-bold border-b-2 border-black">
                CartPage
              </Link>
            </li>
          </div>
        </div>

        {/* ✅ Product Details */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold text-gray-700">Rs {product.price}</p>
          

          {/* ✅ Add to Cart */}
        <CartPage />


          {/* ✅ Description */}
          <div className="border-b pb-2">
        
            
            <button className="text-lg font-semibold border-b-2 border-black">Description</button>
          <button className="text-lg font-semibold text-gray-600">Additional Information</button>
          <button className="text-lg font-semibold text-gray-600">Reviews</button>
<p className="text-gray-700 mt-2">{product.description}</p>
            
          </div>
        </div>
        
      </div>
</div>
  );
}
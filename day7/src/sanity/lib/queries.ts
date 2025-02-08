import { groq } from "next-sanity";

export const allProducts = groq`*[_type == "product"]`;
export const four = groq`*[_type == "product"][0..3]`;
export const query = groq`*[_type == "product"]{
    _id,
    name,
    category,
    price,
    description,
    discountPercentage,
    isFeaturedProduct,
    stockLevel,
    image,
    sizes,
    colors,
    reviews,
    slug,
  }`;
import { Rule } from '@sanity/types'; // Import the Rule type

const productSchema = {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "name",
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
    {
      name: "price",
      type: "number",
      title: "Price",
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
    {
      name: "discountPercentage",
      type: "number",
      title: "Discount Percentage",
    },
    {
      name: "item_id",
      type: "string",
      title: "Item ID",
      options: {
        isUnique: true,
      },
    },
    {
      name: "isFeaturedProduct",
      type: "boolean",
      title: "Featured Product",
    },
    {
      name: "stockLevel",
      type: "number",
      title: "Stock Level",
    },
    {
      name: "category",
      type: "string",
      title: "Category",
    },

    // ✅ Sizes Array (Fix for Undefined Error)
    {
      name: "sizes",
      type: "array",
      title: "Sizes",
      of: [{ type: "string" }],
    },

    // ✅ Colors Array (Fix for Undefined Error)
    {
      name: "colors",
      type: "array",
      title: "Colors",
      of: [{ type: "string" }],
    },

    // ✅ Reviews Array (Fix for Undefined Error)
    {
      name: "reviews",
      type: "array",
      title: "Customer Reviews",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "user",
              type: "string",
              title: "User Name",
            },
            {
              name: "rating",
              type: "number",
              title: "Rating (1-5)",
              validation: (Rule: Rule) => Rule.min(1).max(5), // Fixed the type for Rule
            },
            {
              name: "comment",
              type: "text",
              title: "Review Comment",
            },
          ],
        },
      ],
    },
  ],
};

export { productSchema };
export default productSchema;
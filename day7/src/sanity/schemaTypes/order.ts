const orderSchema = {
    name: "order",
    type: "document",
    title: "Order",
    fields: [
      {
        name: "firstName",
        title: "First Name",
        type: "string",
      },
      {
        name: "lastName",
        title: "Last Name",
        type: "string",
      },
      {
        name: "address",
        title: "Address",
        type: "string",
      },
      {
        name: "city",
        title: "City",
        type: "string",
      },
      {
        name: "zipCode",
        title: "Zip Code",
        type: "string",
      },
      {
        name: "phone",
        title: "Phone",
        type: "string",
      },
      {
        name: "email",
        title: "Email",
        type: "string",
      },
  
      // ✅ Cart Items - Fixed Reference Issue
      {
        name: "cartItems",
        title: "Cart Items",
        type: "array",
        of: [{ type: "reference", to: [{ type: "product" }] }], // 🔥 Fixed array reference
      },
  
      {
        name: "total",
        title: "Total",
        type: "number",
      },
      {
        name: "discount",
        title: "Discount",
        type: "number",
      },
  
      // ✅ Order Status - Fixed Initial Value
      {
        name: "status",
        title: "Order Status",
        type: "string",
        options: {
          list: [
            { title: "Pending", value: "pending" },
            { title: "Success", value: "success" },
            { title: "Dispatched", value: "dispatched" }, // 🔥 Fixed typo
          ],
          layout: "radio",
        },
        initialValue: "pending",
      },
    ],
  };
  
  export default orderSchema;
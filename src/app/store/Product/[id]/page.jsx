import React from "react";
import { getProduct } from "@/libarary";

export default async function ProductDetailPage({ params }) {
  const { id } = params;
  const product = await getProduct(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="mt-2 text-lg">{product.description}</p>
      <p className="mt-2 text-xl font-semibold">Price: ${product.price}</p>
    </div>
  );
}
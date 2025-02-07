import ProductTemplate from "@/components/product-template";
import { notFound } from "next/navigation";
import React from "react";
import { getProductBySlug } from "./actions";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage(props: PageProps) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <ProductTemplate product={product} />
    </div>
  );
}

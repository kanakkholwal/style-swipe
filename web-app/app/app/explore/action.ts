"use server";

import { db } from "@/db/connect";
import { products } from "@/db/schema";

export async function getProducts() {
  try {
    const queryResults = await db
      .select({
        id: products.id,
        productUrl: products.productUrl,
        description: products.description,
        price: products.price,
        mrp: products.mrp,
        title: products.title,
        imageUrls: products.imageUrls,
        gender: products.gender,
        wearType: products.wearType,
      })
      .from(products)
      .limit(30);

    return queryResults;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products.");
  }
}

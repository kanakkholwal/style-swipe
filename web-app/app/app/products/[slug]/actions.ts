"use server";

import { db } from "@/db/connect";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getProductBySlug(id: string) {
  try {
    const queryResults = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);
    return queryResults[0];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products.");
  }
}

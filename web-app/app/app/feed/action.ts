"use server";

import { db } from "@/db/connect";
import { products } from "@/db/schema";

export async function getProducts(){
    try {
        const queryResults = await db.select()
        .from(products)
        .limit(30);
    
        return Promise.resolve(queryResults);
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products.");
    }
}
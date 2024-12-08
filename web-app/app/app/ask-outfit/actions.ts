"use server";

import { db } from "@/db/connect";
import { products } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function getAllOccasions() {
    try {
        // Query to extract distinct specifications.occasion values
        const uniqueOccasionsQuery = await db.execute(
            sql`SELECT DISTINCT specifications->>'occasion' AS occasion
                FROM ${products}`
        );

        // Extract the results into an array
        const uniqueOccasions = uniqueOccasionsQuery.rows.map((row: any) => row.occasion);

        return Promise.resolve(uniqueOccasions)
    } catch (error) {
        console.error("Error fetching unique occasions from specifications:", error);
        throw new Error("Failed to fetch unique occasions.");
    }
}

export async function getOutfitSuggestions(occasion: string, gender: string) {
    try {
        // Fetch products based on occasion and gender
        const queryResults = await db
            .select()
            .from(products)
            .where(products.gender.eq(gender).and(products.wearType.eq(occasion)));

        // Group products by wear_type
        const groupedProducts: Record<string, any[]> = {};

        queryResults.forEach((product) => {
            const { wearType } = product;
            if (!groupedProducts[wearType]) {
                groupedProducts[wearType] = [];
            }
            groupedProducts[wearType].push(product);
        });

        return groupedProducts;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch outfit suggestions.");
    }
}

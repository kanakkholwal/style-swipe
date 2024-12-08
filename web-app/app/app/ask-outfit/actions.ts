"use server";

import { db } from "@/db/connect";
import { products } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";

export async function getAllOccasions() {
    try {
        // Query to extract distinct specifications.occasion values
        const uniqueOccasionsQuery = await db.execute(
            sql`SELECT DISTINCT specifications->>'occasion' AS occasion
                FROM ${products}`
        );

        // Extract the results into an array
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const uniqueOccasions = uniqueOccasionsQuery.rows.map((row: any) => row.occasion);

        return Promise.resolve(uniqueOccasions as string[])
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
            .where(
                and(
                    eq(products.gender, gender),
                    // eq(products.wearType, occasion)
                )
            )
            .limit(10)
            // .groupBy(products.wearType)

        // Group products by wear_type
        const groupedProducts: Record<string, typeof queryResults> = {};

        for (const product of queryResults) {
            const { wearType } = product;
            if (["upper_body","lower_body","footwear"].includes(wearType)) {
                if(!groupedProducts[wearType]) {
                    groupedProducts[wearType] = [];
                }
                groupedProducts[wearType].push(product);
            }
        }

        return groupedProducts;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch outfit suggestions.");
    }
}

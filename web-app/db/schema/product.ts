import { jsonb, numeric, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm/sql";

export const products = pgTable("products", {
	id: text("id").primaryKey().notNull(),
    productUrl: text("product_url").notNull(),
    gender: varchar("gender", { length: 20 }).notNull(),
    itemType: varchar("item_type", { length: 50 }).notNull(),
    wearType: varchar("wear_type", { length: 50 }).notNull(),
    imageUrls:  text('image_urls')
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    mrp: numeric("mrp", { precision: 10, scale: 2 }).notNull(),
    specifications: jsonb("specifications").notNull().default({}),
    // embeddings: vector("embeddings", {
    //     dimensions: 512,
    // }).notNull(),
});


export type ProductType =  typeof products.$inferSelect;

import { jsonb, numeric, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
	id: text("id").primaryKey().notNull().unique(),
    productUrl: text("product_url").notNull(),
    gender: varchar("gender", { length: 20 }).notNull(),
    itemType: varchar("item_type", { length: 50 }).notNull(),
    wearType: varchar("wear_type", { length: 50 }).notNull(),
    imageUrls: jsonb("image_urls").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    price: numeric("price", { precision: 10, scale: 2 }),
    mrp: numeric("mrp", { precision: 10, scale: 2 }),
    specifications: jsonb("specifications").notNull(),
    // embeddings: vector("embeddings", {
    //     dimensions: 512,
    // }).notNull(),
});

import { integer, jsonb, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    productUrl: text("product_url").notNull(),
    gender: varchar("gender", { length: 20 }).notNull(),
    itemType: varchar("item_type", { length: 50 }).notNull(),
    wearType: varchar("wear_type", { length: 50 }).notNull(),
    imageUrls: jsonb("image_urls").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    price: integer("price").notNull(),
    mrp: integer("mrp"),
    specifications: jsonb("specifications").notNull(),
    // embeddings: vector("embeddings", {
    //     dimensions: 512,
    // }).notNull(),
});

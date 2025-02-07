import { EMBEDDING_DIMENSIONS } from "@/project.config";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  jsonb,
  numeric,
  pgTable,
  text,
  varchar,
  vector,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm/sql";

export const products = pgTable("products", {
  id: text("id").primaryKey().notNull(),
  productUrl: text("product_url").notNull(),
  gender: varchar("gender", { length: 20 }).notNull(),
  itemType: varchar("item_type", { length: 50 }).notNull(),
  wearType: varchar("wear_type", { length: 50 }).notNull(),
  imageUrls: text("image_urls")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  mrp: numeric("mrp", { precision: 10, scale: 2 }).notNull(),

  embedding: vector("embedding", {
    dimensions: EMBEDDING_DIMENSIONS,
  }).notNull(),
  specifications: jsonb("specifications")
    .notNull()
    .default(sql`'{}'::jsonb`),
});

// "specifications": {
//  'fit': 'Slim Fit',
// 'length': 'Regular',
//  'main_trend': 'Tropical',
//  'neck': 'Round Neck',
//  'occasion': 'Casual',
// 'pattern': 'Printed',
// 'pattern_coverage': 'All-Over'
//  ...more necessary fields
//  }

export type InsertProductType = InferInsertModel<typeof products>;
export type ProductType = InferSelectModel<typeof products>;

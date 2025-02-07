// import { db } from "@/db/connect";
// import { products } from "@/db/schema";
// import { nanoid } from 'nanoid';
import { NextResponse, type NextRequest } from "next/server";
// import { promises as fs } from 'node:fs';

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    console.log("Inserting products... ", request);
    // const file = await fs.readFile(`${process.cwd()}/../data-scraper/demo-db/processed_db.json`, 'utf8');
    // const contents = JSON.parse(file);
    // // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    // const formattedProducts = contents.map((product:any) => ({
    //     id:nanoid(),
    //     productUrl: product.product_url,
    //     gender: product.gender,
    //     itemType: product.item_type,
    //     wearType: product.wear_type,
    //     imageUrls: product.image_urls,
    //     title: product.title,
    //     description: product.description,
    //     price: product.price,
    //     mrp: product.mrp,
    //     specifications: product.specifications,
    // }));
    // await db.delete(products).where({

    // });

    // await db.insert(products).values(formattedProducts);
    console.log("Products inserted successfully!");

    return NextResponse.json(
      {
        message: "Products inserted successfully!",
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Error inserting products!",
      },
      {
        status: 500,
      },
    );
  }
}

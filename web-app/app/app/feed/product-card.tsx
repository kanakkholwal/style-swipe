"use client";
import { Button } from "@/components/ui/button";
import { CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import type { ProductType } from "@/db/schema/product";
// import useLocalStorage from "@/hooks/use-local-storage";
import {
  // ShoppingCart,
  Bookmark,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ProductCardProps = {
  product: ProductType;
};

export default function ProductCard({ product }: ProductCardProps) {
  // const [saved_products, setSavedProducts] = useLocalStorage<string[]>("saved_products", [])
  const [saved_products, setSavedProducts] = useState<string[]>([]);

  const product_id = product.id;

  const toggleSave = () => {
    if (saved_products.includes(product_id)) {
      setSavedProducts(saved_products.filter((item) => item !== product_id));
    } else {
      setSavedProducts([...saved_products, product_id]);
    }
  };

  return (
    <div className="rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 p-0 w-full max-w-md relative bg-white">
      <div className="p-0">
        <Image
          src={product.imageUrls[0]}
          width={300}
          height={480}
          alt={product.description}
          className="w-full h-auto rounded-t-lg object-cover"
          draggable={false}
        />
      </div>
      <div className="-mt-10 p-4 bg-white/30 backdrop-blur-lg rounded-t-xl relative">
        <CardTitle className="text-lg font-semibold">
          {product.description}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {product.gender.toUpperCase()} | {product.itemType.toUpperCase()}
        </CardDescription>
        <div className="absolute left-auto right-12 -top-1/3">
          <Button
            size="icon_lg"
            rounded="full"
            className="bg-green-600 hover:bg-green-700 shadow-lg"
            onClick={() => toggleSave()}
          >
            {saved_products.includes(product_id) ? (
              <Bookmark className="fill-white" />
            ) : (
              <Bookmark className="text-white" />
            )}
          </Button>
        </div>
      </div>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={`/app/products/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </div>
  );
}

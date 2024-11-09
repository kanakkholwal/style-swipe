"use client";
import { Button } from "@/components/ui/button";
import {
    CardDescription,
    CardFooter,
    CardTitle
} from "@/components/ui/card";
import { slugify } from "@/lib/string";
import { ProductType } from "@/types/product";
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";

type ProductCardProps = {
    product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {

    return <div className="rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 p-0 w-full max-w-md relative bg-white">
        <div className="p-0">
            <Image
                src={product.image_url}
                width={300}
                height={480}
                alt={product.description}
                className="w-full h-auto rounded-t-lg object-cover"
                draggable={false}
            />
        </div>
        <div className="-mt-10 p-4 bg-white/30 backdrop-blur-lg rounded-t-xl relative">
            <CardTitle className="text-lg font-semibold">{product.description}</CardTitle>
            <CardDescription className="text-sm text-gray-600">{product.gender.toUpperCase()} | {product.item_type.toUpperCase()}</CardDescription>
            <div className="absolute left-auto right-12 -top-1/3">
                <Button size="icon_lg" variant="gradient_blue">
                    <ShoppingCart/>
                </Button>

            </div>
        </div>
        <CardFooter>
            <Button className="w-full" asChild>
                <Link href={"/products/" + slugify(product.description)}>
                    View Details
                </Link>
            </Button>
        </CardFooter>
    </div>
}
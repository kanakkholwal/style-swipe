"use client";
import { Button } from "@/components/ui/button";
import {
    Card, CardContent, CardDescription,
    CardFooter,
    CardHeader, CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';
import Link from "next/link";
import type { ProductType } from "./swiping";


type ProductCardProps = {
    product: ProductType;
}

export default function ProductCard({product}: ProductCardProps){

    return <Card className="rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
    <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold">{product.description}</CardTitle>
        <CardDescription className="text-sm text-gray-600">{product.gender.toUpperCase()} | {product.item_type.toUpperCase()}</CardDescription>
    </CardHeader>
    <CardContent className="relative">
        <Image 
            src={product.image_url} 
            width={300} 
            height={480} 
            alt={product.description} 
            className="w-full h-auto max-h-80 rounded-lg object-cover" 
            draggable={false} 
        />
    </CardContent>
    <CardFooter>
        <Button className="w-full" asChild>
            <Link href={"/products/" + product.description}>
            View Details
            </Link>
            </Button>
    </CardFooter>
</Card>
}
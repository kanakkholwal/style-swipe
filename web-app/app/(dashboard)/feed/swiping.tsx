"use client";
import TinderCard from 'react-tinder-card';
import ProductCard from "./product-card";
import {ProductType} from "@/types/product";
import { useState } from 'react';
import { slugify } from '@/lib/string';

type feedQueueType= {
    action:"liked" | "disliked",
    product_id:string
}

export default function SwipeSection({data}:{data:ProductType[]}) {
    const [queue,setQueue] = useState<feedQueueType[]>([])


    const swiped = async (direction: string, product: ProductType) => {
        const data:feedQueueType = {
            action:direction === "left" ? "disliked":"liked",
            product_id:slugify(product.description)
        }
        console.log("----" + direction + "----")
        console.log(direction + ' of : ', product);
        console.log(data)
        setQueue((prev) => [...prev,data])
    };


    const outOfFrame = async(name: any) => {
        console.log(name,' left the screen!');

    };

    return (
        <div className="w-full max-w-xl relative overflow-hidden max-h-screen h-full flex justify-center items-center bg-gray-50">
            {data.map((product, index) => {
                return (
                    <TinderCard
                        className='absolute select-none'
                        onSwipe={(dir) => swiped(dir, product)}
                        swipeThreshold={100}
                        preventSwipe={['down']}
                        flickOnSwipe={true}
                        swipeRequirementType='position'
                        onCardLeftScreen={() => outOfFrame(product)}
                        key={index}
                    >
                        <ProductCard product={product}/>
                    </TinderCard>
                );
            })}
        </div>
    );
};




"use client";
import { slugify } from '@/lib/string';
import { ProductType } from "@/types/product";
import { useState } from 'react';
import TinderCard from 'react-tinder-card';
import ProductCard from "./product-card";

type feedQueueType = {
    action: "liked" | "disliked",
    product_id: string
}



function addToCart(product: ProductType) {
    console.log("Added to cart: ", product);
}
function likeProduct(product: ProductType) {
    console.log("Added to cart: ", product);
}
function dislikeProduct(product: ProductType) {
    console.log("Added to cart: ", product);
}

export default function SwipeSection({ data }: { data: ProductType[] }) {
    const [queue, setQueue] = useState<feedQueueType[]>([])



    const swiped = async (direction: string, product: ProductType) => {
        const data: feedQueueType = {
            action: direction === "left" ? "disliked" : "liked",
            product_id: slugify(product.description)
        }
        console.log("----" + direction + "----")
        console.log(direction + ' of : ', product);
        console.log(data)
        setQueue((prev) => [...prev, data])
    };


    const outOfFrame = async (direction:string,product: ProductType) => {
        console.log(direction, ' left the screen!');
        switch (direction) {
            case "left":
                dislikeProduct(product)
                break;
            case "right":
                likeProduct(product)
                break;
            case "up":
                addToCart(product)
                break;
            default:
                break;
        }

    };
    const handle_success_swipe = (direction: string, product: ProductType) => {

    }
    const handle_failed_swipe = () => {

    }

    return (<>
    

        <div className="w-full max-w-xl relative overflow-hidden max-h-screen h-full flex justify-center items-center">
            {data.map((product, index) => {
                return (
                    <TinderCard
                        className='absolute select-none'
                        onSwipe={(dir) => swiped(dir, product)}
                        swipeThreshold={100}
                        preventSwipe={['down']}
                        flickOnSwipe={true}
                        swipeRequirementType='position'
                        onCardLeftScreen={(direction) => outOfFrame(direction,product)}
                        onSwipeRequirementFulfilled={(dir) => handle_success_swipe(dir, product)}
                        onSwipeRequirementUnfulfilled={handle_failed_swipe}
                        key={index}
                    >
                        <ProductCard product={product} />
                    </TinderCard>
                );
            })}
        </div>
    </>);
};




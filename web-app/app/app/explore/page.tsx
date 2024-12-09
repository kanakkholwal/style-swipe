

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "./action";

export default async function Page() {
    const products = await getProducts();
    // console.log(products);

    return <div className="pt-6 @container">
        <section className="flex justify-between items-center flex-col w-full p-5">
            <h1 className="text-3xl font-bold mb-3">
                Styles curated only for you
            </h1>
            <h4 className="text-xl text-gray-600 mb-8">
                Get your favorite outfit genres
            </h4>
            <form className="w-full max-w-[720px] rounded-2xl flex relative overflow-hidden shadow-md">
                <Input placeholder="Search for your t-shirts, pants, etc" className="h-14 text-md pr-16 rounded-2xl" />
                <Search className="w-6 h-6 text-gray-500 absolute top-1/2 left-auto right-5 -translate-y-[50%]" role="button" type="submit" />
            </form>
        </section>

        <main className="z-10 w-full mx-auto grid grid-cols-2 @xl:grid-cols-3 @4xl:grid-cols-4 @6xl:grid-cols-5 gap-5 flex-wrap items-stretch justify-evenly mt-10">
            {products.map((product) => {
                return <Link href={`/product/${product.id}`}
                    className="flex flex-col items-center bg-slate-20 transition-colors duration-500 p-3 rounded-lg border border-transparent hover:border-cyan-600"
                    key={product.id}>
                    <Image src={product.imageUrls[0]} alt={product.title} className="w-72 h-72 object-cover rounded-lg  hover:shadow-md" width={288} height={288} />
                    <h3 className="text-xl font-bold mt-3">{product.title}</h3>
                    <p className="text-gray-600 mt-1 truncate">
                        {product.description.slice(0, 28)}...
                    </p>
                    <div className="flex items-center mt-2">
                        <span className="text-lg font-bold">₹{product.price}</span>
                        {(Number(product.mrp) > 0) ? (<span className="text-red-600 line-through ml-2">₹{product.mrp}</span>) : null}
                    </div>
                </Link>
            })}
        </main>

    </div>
}

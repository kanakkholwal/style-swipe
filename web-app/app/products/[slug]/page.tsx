import { getProductBySlug } from "@/db/actions/product"
import Image from "next/image"
import { notFound } from "next/navigation"

interface PageProps {
    params:Promise<{
        slug:string
    }>
}

export default async function ProductPage({ params }: PageProps) {
    const product = await getProductBySlug(params.slug)

    if (!product) {
        return notFound()
    }

    return <div>
        <h1 className="text-lg font-bold tracking-wider">
            {product.description}
        </h1>
        <Image src={product.image_url} width={720} height={500} alt={product.description} />
    </div>
}
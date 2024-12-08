import type { ProductType } from "@/db/schema/product"
import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { Suspense } from "react"
import { Button } from "./ui/button"




interface ProductTemplateProps {
    product: ProductType
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
    product
}) => {

    return (
        <>
            <div
                className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
                data-testid="product-container"
            >
                <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-6">
                    <ProductInfo product={product} />
                </div>
                <div className="block w-full relative">
                    <ImageGallery images={product?.imageUrls || []} title={product.title} />
                </div>
                <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12">
                    {/* <ProductOnboardingCta /> */}
                    <Suspense
                        fallback={<Button
                            className="w-full h-10"
                            data-testid="add-product-button"
                        >
                            Add to cart
                        </Button>
                        }
                    >
                        {/* <ProductActionsWrapper id={product.id} region={region} /> */}
                    </Suspense>
                </div>
            </div>
            <div
                className="content-container my-16 small:my-32"
                data-testid="related-products-container"
            >
                {/* <Suspense fallback={<SkeletonRelatedProducts />}> */}
                {/* <RelatedProducts product={product} countryCode={countryCode} /> */}
                {/* </Suspense> */}
            </div>
        </>
    )
}

interface ProductInfoProps {
    product: ProductType
}

const ProductInfo = ({ product }: ProductInfoProps) => {
    return (
        <div id="product-info">
            <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
                {product.id && (
                    <Link
                        href={`/products/${product.id}`}
                        className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
                    >
                        {product.title}
                    </Link>
                )}
                <h2
                    className="text-3xl leading-10 text-ui-fg-base"
                    data-testid="product-title"
                >
                    {product.title}
                </h2>

                <p
                    className="text-medium text-ui-fg-subtle whitespace-pre-line"
                    data-testid="product-description"
                >
                    {product.description}
                </p>
            </div>
        </div>
    )
}

function ImageGallery({ images, title }: { images: string[], title: string }) {
    return (
        <div className="flex items-start relative">
            <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
                {images.map((image, index) => {
                    return (
                        <div
                            key={index + title}
                            className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle"
                            id={index + title}
                        >
                            {!!image && (
                                <Image
                                    src={image}
                                    priority={index <= 2}
                                    className="absolute inset-0 rounded-rounded"
                                    alt={`Product image ${index + 1}`}
                                    fill
                                    sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                                    style={{
                                        objectFit: "cover",
                                    }}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductTemplate
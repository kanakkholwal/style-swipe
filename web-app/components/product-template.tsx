"use client";

import type { ProductType } from "@/db/schema/product";
import clsx from "clsx";
import { ArrowLeftIcon, ArrowRightIcon, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import { Button } from "./ui/button";

const product_size_variants = [
  {
    id: 0,
    name: "XS",
    price: 100,
  },
  {
    id: 1,
    name: "S",
    price: 100,
  },
  {
    id: 2,
    name: "M",
    price: 200,
  },
  {
    id: 3,
    name: "L",
    price: 300,
  },
  {
    id: 4,
    name: "XL",
    price: 400,
  },
  {
    id: 5,
    name: "XXL",
    price: 400,
  },
];

interface ProductTemplateProps {
  product: ProductType;
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  console.log(product);

  return (
    <>
      <div
        className="w-full flex flex-col lg:flex-row lg:items-start lg:justify-around py-6 relative"
        data-testid="product-container"
      >
        <div className="flex flex-col lg:sticky lg:top-48 lg:py-0 lg:max-w-[300px] w-full py-8 gap-y-6">
          <ProductInfo product={product} />
          <ProductDetails product={product} />
        </div>
        <ImageGallery images={product?.imageUrls || []} title={product.title} />
        <div className="flex flex-col lg:sticky lg:top-48 lg:py-0 lg:max-w-[360px] w-full py-8 gap-y-12">
          <div>
            <h5 className="text-md font-semibold mb-4">Select Size</h5>
            <div className="flex justify-between items-center gap-2">
              {product_size_variants.map((variant) => {
                return (
                  <button
                    type="button"
                    key={variant.id}
                    className="text-sm font-medium h-10 rounded-md p-2 flex-1 hover:shadow-lg transition-shadow ease-in-out duration-150 border hover:bg-cyan-100 hover:border-cyan-600"
                  >
                    {variant.name}
                  </button>
                );
              })}
            </div>
          </div>
          <Button className="w-full h-10" data-testid="add-product-button">
            Add to cart
            <ShoppingCartIcon />
          </Button>

          {/* <ProductActionsWrapper id={product.id} region={region} /> */}
        </div>
      </div>
      <div
        className="content-container my-16 lg:my-32"
        data-testid="related-products-container"
      >
        {/* <Suspense fallback={<SkeletonRelatedProducts />}> */}
        {/* <RelatedProducts product={product} countryCode={countryCode} /> */}
        {/* </Suspense> */}
      </div>
    </>
  );
};

interface ProductInfoProps {
  product: ProductType;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.id && (
          <Link
            href={`/apps/collections/${product.itemType}`}
            className="text-md text-muted-foreground font-semibold capitalize"
          >
            {product.itemType}
          </Link>
        )}
        <h2
          className="text-3xl leading-10 text-gray-800 font-bold"
          data-testid="product-title"
        >
          {product.title}
        </h2>

        <p
          className="text-md text-gray-600 font-medium whitespace-pre-line"
          data-testid="product-description"
        >
          {product.description}
        </p>
      </div>
    </div>
  );
};

function ProductDetails({ product }: { product: ProductType }) {
  return (
    <div className="w-full">
      <div className="text-xs font-semibold py-8">
        {/* <div className="grid grid-cols-2 gap-x-8"> */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          {Object.entries(
            product.specifications as unknown as Record<string, string>,
          ).map(([key, value]: [string, unknown]) => {
            return (
              <div key={key}>
                <span className="font-semibold capitalize">{key}</span>
                <p className="text-gray-600">
                  {value === null || value === "unknown"
                    ? "-"
                    : (value as string)}
                </p>
              </div>
            );
          })}
        </div>

        {/* </div> */}
      </div>
    </div>
  );
}

function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [imageIndex, setImageIndex] = useState(0);

  const buttonClassName =
    "h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center";
  return (
    <form className="border rounded-2xl bg-gray-50/30 backdrop-blur-lg p-3 block w-full relative max-w-[720px] mx-5">
      <div className="relative aspect-square h-full mx-auto w-full lg:max-h-[720px] overflow-hidden">
        {images[imageIndex] && (
          <Image
            className="h-full w-full object-contain rounded-2xl"
            fill
            alt={`${title} - Image ${imageIndex + 1}`}
            src={images[imageIndex] as string}
            priority={true}
          />
        )}

        {images.length > 1 ? (
          <div className="absolute bottom-[15%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
              <button
                formAction={() => {
                  const previousImageIndex =
                    imageIndex === 0 ? images.length - 1 : imageIndex - 1;
                  setImageIndex(previousImageIndex);
                }}
                type="button"
                aria-label="Previous product image"
                className={buttonClassName}
              >
                <ArrowLeftIcon className="h-5" />
              </button>
              <div className="mx-1 h-6 w-px bg-neutral-500" />
              <button
                formAction={() => {
                  const nextImageIndex =
                    imageIndex + 1 < images.length ? imageIndex + 1 : 0;

                  setImageIndex(nextImageIndex);
                }}
                type="button"
                aria-label="Next product image"
                className={buttonClassName}
              >
                <ArrowRightIcon className="h-5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <ul className="my-12 flex items-center flex-wrap justify-center gap-2 overflow-auto py-1 lg:mb-0 overflow-y-hidden">
          {images.map((image, index) => {
            const isActive = index === imageIndex;

            return (
              <li key={image} className="h-20 w-20">
                <button
                  formAction={() => {
                    setImageIndex(index);
                  }}
                  type="button"
                  aria-label="Select product image"
                  className="h-full w-full"
                >
                  <GridTileImage
                    alt={`${title} - Image ${index + 1}`}
                    src={image}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </form>
  );
}

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: "bottom" | "center";
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        "group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black",
        {
          relative: label,
          "border-2 border-blue-600": active,
          "border-neutral-200 dark:border-neutral-800": !active,
        },
      )}
    >
      {props.src ? (
        <Image
          className={clsx("relative h-full w-full object-contain", {
            "transition duration-300 ease-in-out group-hover:scale-105":
              isInteractive,
          })}
          {...props}
        />
      ) : null}
    </div>
  );
}

export default ProductTemplate;

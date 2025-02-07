import type { ProductType } from "@/db/schema/product";
import Link from "next/link";
import Price from "./product-price";
import Thumbnail from "./thumbnail";

export default async function ProductPreview({
  product,
}: {
  product: ProductType;
}) {
  return (
    <Link href={`/products/${product.description}`} className="group">
      <div data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.imageUrls[0]}
          images={product.imageUrls}
          size="full"
        />
        <div className="flex txt-compact-medium mt-4 justify-between">
          <h3 className="text-ui-fg-subtle" data-testid="product-title">
            {product.title}
          </h3>
          <div className="flex items-center gap-x-2">
            <Price price={product.price} mrp={product.mrp} />
          </div>
        </div>
      </div>
    </Link>
  );
}

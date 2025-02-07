import { Suspense } from "react";
import { getProducts } from "./action";
import AsideSection from "./aside";
import FiltersSection from "./filters";
import SwipeSection from "./swiping";

export default async function FeedPage() {
  const products = await getProducts();

  return (
    <div className="flex gap-4 h-full w-full">
      <SwipeSection products={products} />
      <Suspense>
        <AsideSection>
          <FiltersSection />
        </AsideSection>
      </Suspense>
    </div>
  );
}

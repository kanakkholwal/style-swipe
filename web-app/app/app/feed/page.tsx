import { DATA } from "@/db/connect";
import { Suspense } from "react";
import AsideSection from "./aside";
import FiltersSection from "./filters";
import SwipeSection from "./swiping";

const databaseFetch = async () => {
    // 3 second promise
    await new Promise((resolve) => setTimeout(resolve, 3000))
    return Promise.resolve(DATA)
}
export default async function FeedPage() {
    const data = await databaseFetch()


    return <div className="flex gap-4 h-full w-full">
        <SwipeSection data={data} />
        <Suspense>
            <AsideSection>
                <FiltersSection />
            </AsideSection>
        </Suspense>
    </div>
}
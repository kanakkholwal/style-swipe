import { DATA } from "@/db/connect";
import AsideSection from "./aside";
import FiltersSection from "./filters";
import SwipeSection from "./swiping";

const databaseFetch = async () => {
    // 3 second promise

    return Promise.resolve(DATA)
}
export default async function FeedPage() {
    const data = await databaseFetch()


    return <div className="flex gap-4 h-full w-full">
        <SwipeSection data={data} />
        <AsideSection>
            <FiltersSection />
        </AsideSection>
    </div>
}
"use client";
import { Button } from "@/components/ui/button";
import filters from "@/constants/filter";
import { sanitize } from "@/lib/string";

export default function FiltersSection() {

    return (<section className="p-4">
        {Array.from(filters.keys()).map((key, index) => <Filter key={index} keyName={key} />)}
    </section>)

}


type filterProps = {
    keyName: string,
}

function Filter(props: filterProps) {



    return <div className="grid w-full gap-2 mb-4">
        <h5 className="text-gray-700 font-semibold capitalize">{sanitize(props.keyName)}</h5>
        <div className="flex flex-wrap gap-2">
            {filters.get(props.keyName)?.map((filter, index) => {
                return <Button key={index} size="sm" variant="secondary">
                    {filter}
                </Button>
            })}
        </div>

    </div>
}
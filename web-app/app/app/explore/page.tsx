

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"




export default function Page() {

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

    </div>
}

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DATA } from "@/db/connect";
import { Sparkles } from "lucide-react";
import Suggestions from "./suggestion";


const user = {
    name: "John Doe",
    email: "johndoe@acme.com",
}


export default function Page() {

    const occasions = (DATA.map((item) => item.specifications.occasion)
        .filter((value, index, self) => self.indexOf(value) === index)
        .filter((value) => value !== undefined)) as string[];

    const suggestions = DATA.reduce((acc, item) => {
        if (acc[item.specifications.occasion as string]) {
            acc[item.specifications.occasion as string].push(item)
        } else {
            acc[item.specifications.occasion as string] = [item]
        }
        return acc
    }, {} as { [key: string]: any[] })

    return (<div className="pt-6 @container">

        <h2 className="text-2xl font-bold mb-4">
            {user ? `Welcome, ${user.name.split(" ")[0]}` : `Welcome to ${process.env.NEXT_PUBLIC_APP_NAME}`}
        </h2>
        <p className="text-gray-600 mb-8">
            Get your wardrobe ready for every occasion with our suggestions!
        </p>
        <div className="flex gap-8 flex-col w-full justify-center items-center">

            <div className="grid gap-4 w-full max-w-[50rem] mx-auto">
                <Textarea
                    placeholder="What are you looking for?"
                    rows={8}
                />
                <div className="flex items-center gap-4 mx-auto">
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Occasion" />
                        </SelectTrigger>
                        <SelectContent>
                            {occasions.map((occasion) => {
                                return <SelectItem value={occasion} key={occasion} className="capitalize">{occasion}</SelectItem>
                            })}
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                            {["men", "women"].map((gender) => {
                                return <SelectItem value={gender} key={gender} className="capitalize">{gender}</SelectItem>
                            })}
                        </SelectContent>
                    </Select>

                </div>
                <Button className="mx-auto shadow-primary shadow-md hover:shadow-lg" rounded="full" width="md">
                    Give Suggestions <Sparkles />
                </Button>
            </div>

            <div className="p-4 max-w-[1440px]" id="suggestions_results">
                <Suggestions {...suggestions} />
            </div>
        </div>
    </div>)
}

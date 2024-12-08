"use client";
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
import Suggestions,{type suggestionsProps} from "./suggestion";
import {getOutfitSuggestions} from "./actions"
import {useState} from "react"

interface FormBoxProps {
    occasions:string[]
}

export default function FormBox({occasions}:FormBoxProps){
    const [prompt,setPrompt] = useState<string>("")
    const [occasion,setOcassion] = useState<typeof occasions[number]>("")
    const [gender,setGender] = useState<string>("")

    const [suggestions,setSuggestion] = useState<suggestionsProps | null>(null)
    
    return <>
     <div className="grid gap-4 w-full max-w-[50rem] mx-auto">
                <Textarea
                    placeholder="What are you looking for?"
                    rows={8}
                />
                <div className="flex items-center gap-4 mx-auto">
                    <Select
                    onSelectChange={(value) => setOcassion(value)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Occasion" />
                        </SelectTrigger>
                        <SelectContent>
                            {occasions.map((occasion) => {
                                return <SelectItem value={occasion} key={occasion} className="capitalize">{occasion}</SelectItem>
                            })}
                        </SelectContent>
                    </Select>
                    <Select                     onSelectChange={(value) => setGender(value)}
                    >
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
                {suggestions && <Suggestions {...suggestions} />}
            </div></>
}
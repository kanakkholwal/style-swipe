"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import Image from 'next/image';
import { useState } from "react";
import { getOutfitSuggestions } from "./actions";

interface FormBoxProps {
    occasions: string[]
}
type suggestionType = Awaited<ReturnType<typeof getOutfitSuggestions>>;

export default function FormBox({ occasions }: FormBoxProps) {
    const [prompt, setPrompt] = useState<string>("")
    const [occasion, setOccasion] = useState<typeof occasions[number]>("")
    const [gender, setGender] = useState<string>("")

    const [suggestions, setSuggestions] = useState<suggestionType | null>(null);


    const getSuggestions = async () => {
        if(!occasion || !prompt || !gender) return
        const suggestions = await getOutfitSuggestions(occasion, gender)
        console.log(suggestions)
        setSuggestions(suggestions)
    }

    return <>
        <div className="grid gap-4 w-full max-w-[50rem] mx-auto">
            <Textarea
                placeholder="What are you looking for?"
                rows={8}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="flex items-center gap-4 mx-auto">
                <Select
                    onValueChange={(value) => setOccasion(value)}
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
                <Select onValueChange={(value) => setGender(value)}
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
            <Button className="mx-auto shadow-primary shadow-md hover:shadow-lg z-10" 
            onClick={getSuggestions}
            
            rounded="full" width="md">
                Give Suggestions <Sparkles />
            </Button>
        </div>

        <div className="p-4 max-w-[1440px]" id="suggestions_results">
            {suggestions && <>
                {Object.entries(suggestions).map(([key, value]) => {
                    return <div key={key} className="flex flex-col gap-4 w-full z-10">
                        <h2 className="text-xl font-bold">{key}</h2>
                        <div className="flex gap-4 flex-wrap items-stretch justify-start">
                            {value.map((item) => {
                                return <SuggestedItem {...item} key={item.id} />
                            })}
                        </div>
                    </div>
                })}
            </>}
        </div></>
}

type suggestedItem = suggestionType[keyof suggestionType][number]

function SuggestedItem(props: suggestedItem) {

    return <Card className='p-2 max-w-96'>
        <CardHeader>
            <Image src={props.imageUrls[0]} alt={props.description} width={360} height={480} className='rounded-md h-auto mx-auto' />
        </CardHeader>
        <CardContent>
            <CardTitle>{props.description}</CardTitle>
            <CardDescription>
                {props?.price} <span className="line-through text-red-500 text-sm">{props?.mrp}</span>
            </CardDescription>
        </CardContent>
    </Card>
}



"use client"

import { useSearchParams } from "next/navigation"
import PreviewProduct from "./preview.desktop"

type AsideSectionProps = {
    children: React.ReactNode
}

export default function AsideSection(props: AsideSectionProps) {
    const searchParams= useSearchParams() as URLSearchParams
    const isPreview = searchParams.get("preview") === "true"
    const slug = searchParams.get("slug")

    return <aside  className="w-full hidden lg:grid border-l max-w-3/5">
        {(isPreview && slug) && <PreviewProduct slug={slug}/>}
        {props.children}
    </aside>
}
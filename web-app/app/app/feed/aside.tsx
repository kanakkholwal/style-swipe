"use client";

import { useSearchParams } from "next/navigation";
import PreviewProduct from "./preview.desktop";

type AsideSectionProps = {
  children: React.ReactNode;
};

export default function AsideSection(props: AsideSectionProps) {
  const searchParams = useSearchParams() as URLSearchParams;
  const preview_slug = searchParams.get("preview");

  return (
    <aside className="w-full hidden lg:grid border-l max-w-3/5 relative">
      {preview_slug && <PreviewProduct slug={preview_slug} />}
      {props.children}
    </aside>
  );
}

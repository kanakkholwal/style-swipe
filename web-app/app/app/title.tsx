"use client";

import { sanitize } from "@/lib/string";
import { usePathname } from "next/navigation";

// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
export function PageTitle() {
  const pathname = usePathname();
  const title = pathname.split("/").pop();
  return (
    <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200 capitalize">
      {sanitize(title!)}

      {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    {process.env.NEXT_PUBLIC_APP_NAME}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
    </h1>
  );
}

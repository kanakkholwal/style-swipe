import { AppSidebar } from "@/components/app-sidebar"
import { PageTitle } from "./title"

import { GradientBalls } from "@/components/gradient"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Bookmark,
  ShoppingCart
} from 'lucide-react'
import { Suspense } from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  const items_in_cart = ["sd",""]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <GradientBalls className="z-0" />
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" size="icon_sm" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Suspense fallback={<Skeleton className="w-24 h-8" />}>
              <PageTitle />
            </Suspense>
            <div className="flex-1" />
            <Button size="icon" rounded="full">
              <Bookmark />
            </Button>
            <Button 
            size={items_in_cart.length > 0 ? "default" : "icon"}
            rounded="full" 
            variant="default_light"
            >
              <ShoppingCart />
              {items_in_cart.length > 0 && (
                <>
                Checkout
                  ( {items_in_cart.length} )
                </>
              )}
            </Button>
          </div>
        </header>
        <main className="p-4 pt-0 h-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

"use client"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import {
  Frame,
  GalleryVerticalEnd,
  Map as MapIcon,
  PieChart,
  Settings2
} from "lucide-react"
import Link from "next/link"
import type { ComponentProps } from "react"
// This is sample data.
const data = {
  navMain: [
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  routes: [
    {
      name: "Explore Feed",
      url: "/app/feed",
      icon: Frame,
    },
    {
      name: "Ask your outfit",
      url: "/app/ask-outfit",
      icon: PieChart,
    },
    {
      name: "Search for outfits",
      url: "/app/explore",
      icon: MapIcon,
    },
  ],
}

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const {
    data: session
} = useSession()
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              asChild
            >
              <Link href="/app">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {process.env.NEXT_PUBLIC_APP_NAME}
                  </span>
                  <span className="truncate text-xs">{"Alpha Version"}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.routes} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {session && <NavUser user={{
          name: session.user.name,
          email: session.user.email,
          image: session.user.image ?? ""
        }} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

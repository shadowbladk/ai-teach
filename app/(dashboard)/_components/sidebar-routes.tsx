"use client"

import { BarChart, Compass, Layout, User, Home, List } from "lucide-react"
import { usePathname } from "next/navigation"

import { SidebarItem } from "./sidebar-item"

const guestRoutes = [
  // {
  //   icon: Layout,
  //   label: "Dashboard",
  //   href: "/",
  // },
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: User,
    label: "Profile",
    href: "/profile",
  },
  {
    icon: Compass,
    label: "Explore",
    href: "/explore",
  },
]

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  // {
  //   icon: BarChart,
  //   label: "Analytics",
  //   href: "/teacher/analytics",
  // },
]

export const SidebarRoutes = () => {
  const pathname = usePathname()

  const isTeacherPage = pathname?.includes("/teacher")

  const routes = isTeacherPage ? teacherRoutes : guestRoutes

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}

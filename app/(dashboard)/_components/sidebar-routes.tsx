"use client";

import { Compass, Layout, List } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guessRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Explore",
    href: "/explore",
  },
];

const instutorRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/instutor/courses",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isInstutorPage = pathname?.includes("/instutor");

  const routes = isInstutorPage ? instutorRoutes : guessRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => {
        return (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        );
      })}
    </div>
  );
};

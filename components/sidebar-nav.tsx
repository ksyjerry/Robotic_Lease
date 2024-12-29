"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/sidebar-provider"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ReactNode
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const { isOpen } = useSidebar()

  return (
    <nav
      className={cn(
        "flex space-y-1 lg:space-y-2 flex-col h-full bg-gray-900 text-white p-4 transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-20",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Button
          key={item.href}
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 font-normal hover:bg-gray-800",
            !isOpen && "justify-center px-0"
          )}
          asChild
        >
          <Link href={item.href}>
            {item.icon}
            {isOpen && <span>{item.title}</span>}
          </Link>
        </Button>
      ))}
    </nav>
  )
}


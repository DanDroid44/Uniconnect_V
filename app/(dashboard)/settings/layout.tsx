"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { useContext } from "react"
import { AppContext } from "@/app/context/app-provider"
import { translations } from "@/data/translations"

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { language } = useContext(AppContext)
  const t = translations[language].settings

  const sidebarNavItems = [
    { title: t.nav.profile, href: "/settings" },
    { title: t.nav.notifications, href: "/settings/notifications" },
    { title: t.nav.accessibility, href: "/settings/accessibility" },
    { title: t.nav.language, href: "/settings/language" },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{t.title}</h2>
        <p className="text-muted-foreground">{t.description}</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            {sidebarNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground px-4 py-2",
                  pathname === item.href ? "bg-muted" : "hover:bg-transparent hover:underline",
                  "justify-start",
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  )
}

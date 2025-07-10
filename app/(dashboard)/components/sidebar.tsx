"use client"

import { useContext } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AppContext } from "@/app/context/app-provider"
import { cn } from "@/lib/utils"
import { BookOpen, Calendar, CreditCard, GraduationCap, Home, Settings, Users, Library } from "lucide-react"
import { translations } from "@/data/translations"

export function Sidebar() {
  const { role, language } = useContext(AppContext)
  const pathname = usePathname()
  const t = translations[language]

  const studentNav = [
    { href: "/student", label: t.sidebar.dashboard, icon: Home },
    { href: "/student/grades", label: t.sidebar.grades, icon: BookOpen },
    { href: "/student/schedule", label: t.sidebar.schedule, icon: Calendar },
    { href: "/student/payments", label: t.sidebar.payments, icon: CreditCard },
  ]

  const lecturerNav = [
    { href: "/lecturer", label: t.sidebar.dashboard, icon: Home },
    { href: "/lecturer/subjects", label: t.sidebar.mySubjects, icon: Library },
    { href: "/lecturer/grades", label: t.sidebar.enterGrades, icon: BookOpen },
  ]

  const coordinatorNav = [
    { href: "/coordinator", label: t.sidebar.dashboard, icon: Home },
    { href: "/coordinator/students", label: t.sidebar.allStudents, icon: Users },
  ]

  const commonNav = [{ href: "/settings", label: t.sidebar.settings, icon: Settings }]

  let navItems = []
  if (role === "student") navItems = studentNav
  else if (role === "lecturer") navItems = lecturerNav
  else if (role === "coordinator") navItems = coordinatorNav

  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="">UniConnect</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname === item.href && "bg-muted text-primary",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            <hr className="my-4" />
            {commonNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname.startsWith(item.href) && "bg-muted text-primary",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

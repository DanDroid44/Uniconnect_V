"use client"

import { useContext } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, BarChart, CalendarCheck, UserCog, User, ArrowRight } from "lucide-react"
import { LanguageSwitcher } from "@/app/(dashboard)/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { AppContext } from "@/app/context/app-provider"
import { translations } from "@/data/translations"

export default function LandingPage() {
  const { language } = useContext(AppContext)
  const t = translations[language].landing

  const features = [
    { icon: Users, title: t.features.roles.title, description: t.features.roles.description },
    { icon: BarChart, title: t.features.grades.title, description: t.features.grades.description },
    { icon: CalendarCheck, title: t.features.schedule.title, description: t.features.schedule.description },
  ]

  const roles = [
    { icon: User, title: t.roles.student.title, description: t.roles.student.description },
    { icon: UserCog, title: t.roles.lecturer.title, description: t.roles.lecturer.description },
    { icon: GraduationCap, title: t.roles.coordinator.title, description: t.roles.coordinator.description },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="#" className="flex items-center justify-center">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="ml-2 font-semibold">UniConnect</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button asChild>
            <Link href="/login">{t.ctaLogin}</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 text-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">{t.hero.title}</h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">{t.hero.description}</p>
                </div>
                <Button asChild size="lg" className="mx-auto">
                  <Link href="/login">
                    {t.hero.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">{t.features.title}</h2>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="grid gap-1 text-center">
                  <feature.icon className="h-10 w-10 mx-auto text-primary" />
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="roles" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">{t.roles.title}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {roles.map((role, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <role.icon className="h-8 w-8 text-primary" />
                    <CardTitle>{role.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{role.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2025 UniConnect Demo. All rights reserved.</p>
      </footer>
    </div>
  )
}

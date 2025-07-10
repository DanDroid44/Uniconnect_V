"use client"

import { useContext } from "react"
import { AppContext } from "@/app/context/app-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Calendar, CreditCard, TrendingUp, UserIcon } from "lucide-react"
import { translations } from "@/data/translations"
import Link from "next/link"

export default function StudentDashboard() {
  const { user, language } = useContext(AppContext)
  const t = translations[language]

  if (!user || user.role !== "student") return null

  const getAverageGrade = () => {
    if (!user.grades || user.grades.length === 0) return "N/A"
    const total = user.grades.reduce((acc, g) => acc + g.average, 0)
    return (total / user.grades.length).toFixed(2)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        {t.dashboard.welcome}, {user.name}!
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.dashboard.avgGrade}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getAverageGrade()} / 20</div>
            <p className="text-xs text-muted-foreground">
              {t.dashboard.basedOnSubjects.replace("{count}", user.grades.length.toString())}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.dashboard.paymentStatus}</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${user.paymentStatus === "Paid" ? "text-green-500" : "text-red-500"}`}>
              {t.payments[user.paymentStatus.toLowerCase() as "paid" | "unpaid"]}
            </div>
            <p className="text-xs text-muted-foreground">{t.dashboard.nextPaymentDue}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.dashboard.enrolledSubjects}</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.grades.length}</div>
            <p className="text-xs text-muted-foreground">{t.dashboard.viewAllGrades}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.dashboard.upcomingClasses}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">{t.dashboard.checkSchedule}</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t.dashboard.quickLinks}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Link href="/student/grades" className="p-4 bg-muted rounded-lg hover:bg-muted/80 text-center">
              <BookOpen className="mx-auto h-8 w-8 mb-2" />
              <span className="font-medium">{t.sidebar.grades}</span>
            </Link>
            <Link href="/student/schedule" className="p-4 bg-muted rounded-lg hover:bg-muted/80 text-center">
              <Calendar className="mx-auto h-8 w-8 mb-2" />
              <span className="font-medium">{t.sidebar.schedule}</span>
            </Link>
            <Link href="/student/payments" className="p-4 bg-muted rounded-lg hover:bg-muted/80 text-center">
              <CreditCard className="mx-auto h-8 w-8 mb-2" />
              <span className="font-medium">{t.sidebar.payments}</span>
            </Link>
            <Link href="/settings" className="p-4 bg-muted rounded-lg hover:bg-muted/80 text-center">
              <UserIcon className="mx-auto h-8 w-8 mb-2" />
              <span className="font-medium">{t.sidebar.settings}</span>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

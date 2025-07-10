"use client"

import { useContext } from "react"
import { AppContext } from "@/app/context/app-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { translations } from "@/data/translations"
import { Users, UserCheck, UserX } from "lucide-react"
import Link from "next/link"

export default function CoordinatorDashboard() {
  const { allUsers, language } = useContext(AppContext)
  const t = translations[language]

  const totalStudents = allUsers.students.length
  const paidStudents = allUsers.students.filter((s) => s.paymentStatus === "Paid").length
  const unpaidStudents = totalStudents - paidStudents

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t.coordinator.title}</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.coordinator.totalStudents}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">{t.coordinator.acrossAllFaculties}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.coordinator.paidStudents}</CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paidStudents}</div>
            <p className="text-xs text-muted-foreground">{t.coordinator.upToDatePayments}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.coordinator.unpaidStudents}</CardTitle>
            <UserX className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unpaidStudents}</div>
            <p className="text-xs text-muted-foreground">{t.coordinator.pendingPayments}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t.dashboard.quickLinks}</CardTitle>
        </CardHeader>
        <CardContent>
          <Link href="/coordinator/students" className="p-4 bg-muted rounded-lg hover:bg-muted/80 text-center block">
            <Users className="mx-auto h-8 w-8 mb-2" />
            <span className="font-medium">{t.coordinator.manageStudents}</span>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useContext } from "react"
import { AppContext } from "@/app/context/app-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { translations } from "@/data/translations"
import { BookOpen, Library, Users } from "lucide-react"
import Link from "next/link"

export default function LecturerDashboard() {
  const { user, allUsers, language } = useContext(AppContext)
  const t = translations[language]

  if (!user || user.role !== "lecturer") return null

  const totalStudents = allUsers.students.filter((student) =>
    student.grades.some((g) => user.assignedCourses.includes(g.subject)),
  ).length

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        {t.dashboard.welcome}, {user.name}!
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.lecturer.assignedSubjects}</CardTitle>
            <Library className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.assignedCourses.length}</div>
            <p className="text-xs text-muted-foreground">{t.lecturer.viewAllSubjects}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.lecturer.totalStudents}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">{t.lecturer.acrossAllSubjects}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t.dashboard.quickLinks}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <Link href="/lecturer/subjects" className="p-4 bg-muted rounded-lg hover:bg-muted/80 text-center">
            <Library className="mx-auto h-8 w-8 mb-2" />
            <span className="font-medium">{t.sidebar.mySubjects}</span>
          </Link>
          <Link href="/lecturer/grades" className="p-4 bg-muted rounded-lg hover:bg-muted/80 text-center">
            <BookOpen className="mx-auto h-8 w-8 mb-2" />
            <span className="font-medium">{t.sidebar.enterGrades}</span>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

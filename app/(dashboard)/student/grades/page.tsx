"use client"

import { useContext } from "react"
import { AppContext } from "@/app/context/app-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { translations } from "@/data/translations"
import { Badge } from "@/components/ui/badge"

export default function GradesPage() {
  const { user, language } = useContext(AppContext)
  const t = translations[language]

  if (!user || user.role !== "student") return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.grades.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.grades.subject}</TableHead>
              <TableHead className="text-center">{t.grades.assignment1}</TableHead>
              <TableHead className="text-center">{t.grades.assignment2}</TableHead>
              <TableHead className="text-center">{t.grades.test1}</TableHead>
              <TableHead className="text-center">{t.grades.test2}</TableHead>
              <TableHead className="text-center">{t.grades.exam}</TableHead>
              <TableHead className="text-center font-bold">{t.grades.average}</TableHead>
              <TableHead className="text-center">{t.grades.status}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {user.grades.map((grade) => (
              <TableRow key={grade.subject}>
                <TableCell className="font-medium">{grade.subject}</TableCell>
                <TableCell className="text-center">{grade.assignment1}</TableCell>
                <TableCell className="text-center">{grade.assignment2}</TableCell>
                <TableCell className="text-center">{grade.test1}</TableCell>
                <TableCell className="text-center">{grade.test2}</TableCell>
                <TableCell className="text-center">{grade.exam}</TableCell>
                <TableCell className="text-center font-bold">{grade.average.toFixed(2)}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={grade.average >= 10 ? "default" : "destructive"}
                    className={grade.average >= 10 ? "bg-green-500" : ""}
                  >
                    {grade.average >= 10 ? t.grades.passed : t.grades.failed}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

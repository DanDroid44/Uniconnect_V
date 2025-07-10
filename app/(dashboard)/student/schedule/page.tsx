"use client"

import { useContext } from "react"
import { AppContext } from "@/app/context/app-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { translations } from "@/data/translations"

export default function SchedulePage() {
  const { user, language } = useContext(AppContext)
  const t = translations[language]

  if (!user || user.role !== "student") return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.schedule.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.schedule.day}</TableHead>
              <TableHead>{t.schedule.time}</TableHead>
              <TableHead>{t.schedule.subject}</TableHead>
              <TableHead>{t.schedule.lecturer}</TableHead>
              <TableHead>{t.schedule.room}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {user.schedule.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {t.schedule.days[item.day.toLowerCase() as keyof typeof t.schedule.days]}
                </TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell>{item.lecturer}</TableCell>
                <TableCell>{item.room}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

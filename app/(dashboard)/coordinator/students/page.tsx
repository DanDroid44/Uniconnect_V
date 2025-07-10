"use client"

import { useContext, useState } from "react"
import { AppContext } from "@/app/context/app-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { translations } from "@/data/translations"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { PlusCircle, Trash2 } from "lucide-react"
import { BackButton } from "../../components/back-button"

export default function CoordinatorStudentsPage() {
  const { allUsers, language } = useContext(AppContext)
  const t = translations[language]
  const { toast } = useToast()
  const [filter, setFilter] = useState("")

  const filteredStudents = allUsers.students.filter(
    (s) =>
      s.name.toLowerCase().includes(filter.toLowerCase()) ||
      s.id.toLowerCase().includes(filter.toLowerCase()) ||
      s.faculty.toLowerCase().includes(filter.toLowerCase()),
  )

  const handleAddStudent = () => {
    toast({
      title: t.coordinator.addStudentTitle,
      description: t.coordinator.addStudentDesc,
    })
  }

  const handleRemoveStudent = (name: string) => {
    toast({
      title: t.coordinator.removeStudentTitle,
      description: `${t.coordinator.removeStudentDesc} ${name}.`,
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle>{t.coordinator.allStudents}</CardTitle>
          <CardDescription>{t.coordinator.allStudentsDesc}</CardDescription>
          <div className="flex flex-col md:flex-row items-center justify-between pt-4 gap-4">
            <Input
              placeholder={t.coordinator.filterPlaceholder}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full md:max-w-sm"
            />
            <Button onClick={handleAddStudent} className="w-full md:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              {t.coordinator.addStudent}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.lecturer.studentName}</TableHead>
                <TableHead>{t.lecturer.studentId}</TableHead>
                <TableHead>{t.lecturer.faculty}</TableHead>
                <TableHead>{t.dashboard.paymentStatus}</TableHead>
                <TableHead className="text-center">{t.dashboard.avgGrade}</TableHead>
                <TableHead className="text-right">{t.lecturer.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => {
                const avgGrade =
                  student.grades.length > 0
                    ? student.grades.reduce((acc, g) => acc + g.average, 0) / student.grades.length
                    : 0
                return (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.faculty}</TableCell>
                    <TableCell>
                      <Badge
                        variant={student.paymentStatus === "Paid" ? "default" : "destructive"}
                        className={student.paymentStatus === "Paid" ? "bg-green-500" : ""}
                      >
                        {t.payments[student.paymentStatus.toLowerCase() as "paid" | "unpaid"]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={avgGrade >= 10 ? "default" : "secondary"}
                        className={avgGrade >= 10 ? "bg-blue-500" : ""}
                      >
                        {avgGrade.toFixed(2)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveStudent(student.name)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

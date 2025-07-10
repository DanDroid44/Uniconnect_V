"use client"

import { useContext, useState, useEffect } from "react"
import { AppContext } from "@/app/context/app-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { translations } from "@/data/translations"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BackButton } from "../../components/back-button"

export default function EnterGradesPage() {
  const { user, allUsers, updateStudentGrade, language } = useContext(AppContext)
  const t = translations[language]
  const { toast } = useToast()

  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [grades, setGrades] = useState<any[]>([])

  useEffect(() => {
    if (user && user.role === "lecturer" && user.assignedCourses.length > 0) {
      setSelectedCourse(user.assignedCourses[0])
    }
  }, [user])

  useEffect(() => {
    if (user && user.role === "lecturer" && selectedCourse) {
      const studentsInClass = allUsers.students.filter((s) => s.grades.some((g) => g.subject === selectedCourse))
      const initialGrades = studentsInClass.map((s) => {
        const gradeInfo = s.grades.find((g) => g.subject === selectedCourse)
        return {
          studentId: s.id,
          studentName: s.name,
          ...gradeInfo,
        }
      })
      setGrades(initialGrades)
    }
  }, [user, allUsers, selectedCourse])

  const handleGradeChange = (studentId: string, field: string, value: string) => {
    const numericValue = Math.max(0, Math.min(20, Number(value)))
    setGrades((prev) => prev.map((g) => (g.studentId === studentId ? { ...g, [field]: numericValue } : g)))
  }

  const handleSaveChanges = (studentId: string) => {
    const gradeData = grades.find((g) => g.studentId === studentId)
    if (gradeData && user && user.role === "lecturer") {
      const { studentName, studentId: sId, ...newGrades } = gradeData
      updateStudentGrade(studentId, selectedCourse, newGrades)
      toast({
        title: t.lecturer.gradesUpdated,
        description: `${t.lecturer.gradesUpdatedDesc} ${gradeData.studentName}.`,
      })
    }
  }

  if (!user || user.role !== "lecturer") return null

  return (
    <div className="space-y-6">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle>{t.lecturer.enterGradesTitle}</CardTitle>
          <CardDescription>{t.lecturer.enterGradesDesc}</CardDescription>
          <div className="pt-4">
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-full md:w-[280px]">
                <SelectValue placeholder={t.lecturer.selectCourse} />
              </SelectTrigger>
              <SelectContent>
                {user.assignedCourses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">{t.lecturer.studentName}</TableHead>
                  <TableHead>{t.grades.assignment1}</TableHead>
                  <TableHead>{t.grades.assignment2}</TableHead>
                  <TableHead>{t.grades.test1}</TableHead>
                  <TableHead>{t.grades.test2}</TableHead>
                  <TableHead>{t.grades.exam}</TableHead>
                  <TableHead>{t.grades.average}</TableHead>
                  <TableHead>{t.lecturer.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.map((grade) => (
                  <TableRow key={grade.studentId}>
                    <TableCell className="font-medium">{grade.studentName}</TableCell>
                    {["assignment1", "assignment2", "test1", "test2", "exam"].map((field) => (
                      <TableCell key={field}>
                        <Input
                          type="number"
                          min="0"
                          max="20"
                          value={grade[field]}
                          onChange={(e) => handleGradeChange(grade.studentId, field, e.target.value)}
                          className="w-20"
                        />
                      </TableCell>
                    ))}
                    <TableCell className="font-bold">{grade.average.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button size="sm" onClick={() => handleSaveChanges(grade.studentId)}>
                        {t.lecturer.save}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

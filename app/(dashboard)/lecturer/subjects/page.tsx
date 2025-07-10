"use client"

import { useContext } from "react"
import { AppContext } from "@/app/context/app-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { translations } from "@/data/translations"
import { BackButton } from "../../components/back-button"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function LecturerSubjectsPage() {
  const { user, allUsers, language } = useContext(AppContext)
  const t = translations[language]
  const { toast } = useToast()

  if (!user || user.role !== "lecturer") return null

  const getStudentsForSubject = (subject: string) => {
    return allUsers.students.filter((student) => student.grades.some((g) => g.subject === subject))
  }

  const handleViewDetails = (studentName: string) => {
    toast({
      title: t.common.featureComingSoon,
      description: `${t.lecturer.viewDetailsDesc} ${studentName}.`,
    })
  }

  return (
    <div className="space-y-6">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle>{t.lecturer.mySubjectsPage.title}</CardTitle>
          <CardDescription>{t.lecturer.mySubjectsPage.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {user.assignedCourses.map((subject) => {
              const enrolledStudents = getStudentsForSubject(subject)
              return (
                <AccordionItem key={subject} value={subject}>
                  <AccordionTrigger>
                    {subject} ({enrolledStudents.length} {t.roles.student.toLowerCase()}s)
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t.lecturer.studentName}</TableHead>
                          <TableHead>{t.lecturer.studentId}</TableHead>
                          <TableHead className="text-right">{t.lecturer.actions}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {enrolledStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.id}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" onClick={() => handleViewDetails(student.name)}>
                                {t.lecturer.viewDetails}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

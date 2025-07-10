"use client"

import { useContext } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AppContext } from "@/app/context/app-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, User, UserCog } from "lucide-react"
import { translations } from "@/data/translations"
import type { User as UserType } from "@/data/mock-data"

export default function LoginPage() {
  const { loginAs, allUsers, language } = useContext(AppContext)
  const router = useRouter()
  const t = translations[language]

  const handleLogin = (user: UserType) => {
    loginAs(user)
    router.push(`/${user.role}`)
  }

  const roleIcons = {
    student: <User className="h-5 w-5 text-muted-foreground" />,
    lecturer: <UserCog className="h-5 w-5 text-muted-foreground" />,
    coordinator: <GraduationCap className="h-5 w-5 text-muted-foreground" />,
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="flex justify-center items-center mb-4">
              <GraduationCap className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">UniConnect</h1>
          </Link>
          <p className="text-muted-foreground">{t.login.description}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.roles.student}s</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {allUsers.students.map((user) => (
                <Button
                  key={user.id}
                  onClick={() => handleLogin(user)}
                  className="w-full justify-start gap-4"
                  variant="outline"
                >
                  {roleIcons.student}
                  <span>{user.name}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t.roles.lecturer}s</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {allUsers.lecturers.map((user) => (
                <Button
                  key={user.id}
                  onClick={() => handleLogin(user)}
                  className="w-full justify-start gap-4"
                  variant="outline"
                >
                  {roleIcons.lecturer}
                  <span>{user.name}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t.roles.coordinator}s</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {allUsers.coordinators.map((user) => (
                <Button
                  key={user.id}
                  onClick={() => handleLogin(user)}
                  className="w-full justify-start gap-4"
                  variant="outline"
                >
                  {roleIcons.coordinator}
                  <span>{user.name}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

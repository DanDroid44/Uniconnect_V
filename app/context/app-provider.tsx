"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import {
  mockData,
  type User,
  type Student,
  type Lecturer,
  type Coordinator,
  type Grade,
  type NotificationPreferences,
  type AccessibilitySettings,
} from "@/data/mock-data"

type Role = "student" | "lecturer" | "coordinator" | null
type Language = "en" | "pt"

interface AppContextType {
  role: Role
  setRole: (role: Role) => void
  user: User | null
  loginAs: (user: User) => void
  allUsers: typeof mockData
  updateUser: (updatedDetails: Partial<User>) => void
  updateStudentGrade: (studentId: string, subject: string, newGrades: Partial<Grade>) => void
  language: Language
  setLanguage: (language: Language) => void
  loading: boolean
  notifications: typeof mockData.notifications
  updateNotificationPreferences: (prefs: NotificationPreferences) => void
  updateAccessibilitySettings: (settings: AccessibilitySettings) => void
}

export const AppContext = createContext<AppContextType>({} as AppContextType)

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>(null)
  const [user, setUser] = useState<User | null>(null)
  const [allUsers, setAllUsers] = useState(mockData)
  const [language, setLanguageState] = useState<Language>("en")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUserId = localStorage.getItem("uniconnect_userId")
    const savedLang = localStorage.getItem("uniconnect_lang") as Language

    if (savedUserId) {
      const findUser = (id: string): User | undefined => {
        return [...allUsers.students, ...allUsers.lecturers, ...allUsers.coordinators].find((u) => u.id === id)
      }
      const loggedInUser = findUser(savedUserId)
      if (loggedInUser) {
        setUser(loggedInUser)
        setRoleState(loggedInUser.role)
        applyAccessibility(loggedInUser.accessibilitySettings)
      }
    }

    if (savedLang) {
      setLanguageState(savedLang)
    }
    setLoading(false)
  }, [])

  const applyAccessibility = (settings: AccessibilitySettings) => {
    const root = document.documentElement
    root.classList.remove("font-size-sm", "font-size-lg", "high-contrast")
    if (settings.fontSize === "sm") root.classList.add("font-size-sm")
    if (settings.fontSize === "lg") root.classList.add("font-size-lg")
    if (settings.contrast === "high") root.classList.add("high-contrast")
  }

  const loginAs = (selectedUser: User) => {
    localStorage.setItem("uniconnect_userId", selectedUser.id)
    setUser(selectedUser)
    setRoleState(selectedUser.role)
    applyAccessibility(selectedUser.accessibilitySettings)
  }

  const setRole = (newRole: Role) => {
    if (newRole === null) {
      localStorage.removeItem("uniconnect_userId")
      setUser(null)
    }
    setRoleState(newRole)
  }

  const setLanguage = (newLanguage: Language) => {
    localStorage.setItem("uniconnect_lang", newLanguage)
    setLanguageState(newLanguage)
  }

  const updateUser = (updatedDetails: Partial<User>) => {
    if (!user) return
    const updatedUser = { ...user, ...updatedDetails }
    setUser(updatedUser)

    setAllUsers((prev) => {
      if (user.role === "student") {
        return { ...prev, students: prev.students.map((s) => (s.id === user.id ? (updatedUser as Student) : s)) }
      }
      if (user.role === "lecturer") {
        return { ...prev, lecturers: prev.lecturers.map((l) => (l.id === user.id ? (updatedUser as Lecturer) : l)) }
      }
      if (user.role === "coordinator") {
        return {
          ...prev,
          coordinators: prev.coordinators.map((c) => (c.id === user.id ? (updatedUser as Coordinator) : c)),
        }
      }
      return prev
    })
  }

  const updateStudentGrade = (studentId: string, subject: string, newGrades: Partial<Grade>) => {
    setAllUsers((prev) => {
      const newStudents = prev.students.map((student) => {
        if (student.id === studentId) {
          const newStudentGrades = student.grades.map((grade) => {
            if (grade.subject === subject) {
              const updatedGrade = { ...grade, ...newGrades }
              const { assignment1, assignment2, test1, test2, exam } = updatedGrade
              updatedGrade.average = (assignment1 + assignment2 + test1 + test2 + exam) / 5
              return updatedGrade
            }
            return grade
          })
          return { ...student, grades: newStudentGrades }
        }
        return student
      })
      return { ...prev, students: newStudents }
    })
  }

  const updateNotificationPreferences = (prefs: NotificationPreferences) => {
    if (!user) return
    updateUser({ notificationPreferences: prefs })
  }

  const updateAccessibilitySettings = (settings: AccessibilitySettings) => {
    if (!user) return
    updateUser({ accessibilitySettings: settings })
    applyAccessibility(settings)
  }

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        user,
        loginAs,
        allUsers,
        updateUser,
        updateStudentGrade,
        language,
        setLanguage,
        loading,
        notifications: allUsers.notifications,
        updateNotificationPreferences,
        updateAccessibilitySettings,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

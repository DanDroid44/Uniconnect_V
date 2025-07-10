export interface Grade {
  subject: string
  assignment1: number
  assignment2: number
  test1: number
  test2: number
  exam: number
  average: number
}

export interface ScheduleItem {
  day: string
  time: string
  subject: string
  lecturer: string
  room: string
}

export interface Payment {
  month: string
  amount: string
  date: string
  status: "Paid" | "Unpaid"
}

export interface Notification {
  id: string
  title: string
  content: string
  sender: string
  course?: string
  urgency: "Low" | "Medium" | "High"
  timestamp: string
}

export interface NotificationPreferences {
  email: boolean
  push: boolean
  inApp: boolean
}

export interface AccessibilitySettings {
  fontSize: "sm" | "md" | "lg"
  contrast: "normal" | "high"
}

export interface Student {
  id: string
  role: "student"
  name: string
  age: number
  email: string
  bio: string
  year: number
  faculty: string
  grades: Grade[]
  schedule: ScheduleItem[]
  paymentStatus: "Paid" | "Unpaid"
  paymentHistory: Payment[]
  notificationPreferences: NotificationPreferences
  accessibilitySettings: AccessibilitySettings
}

export interface Lecturer {
  id: string
  role: "lecturer"
  name: string
  age: number
  email: string
  bio: string
  assignedCourses: string[]
  notificationPreferences: NotificationPreferences
  accessibilitySettings: AccessibilitySettings
}

export interface Coordinator {
  id: string
  role: "coordinator"
  name: string
  age: number
  email: string
  bio: string
  notificationPreferences: NotificationPreferences
  accessibilitySettings: AccessibilitySettings
}

export type User = Student | Lecturer | Coordinator

const calculateAverage = (grades: Omit<Grade, "average" | "subject">): number => {
  return (grades.assignment1 + grades.assignment2 + grades.test1 + grades.test2 + grades.exam) / 5
}

const defaultNotificationPrefs: NotificationPreferences = { email: true, push: true, inApp: true }
const defaultAccessSettings: AccessibilitySettings = { fontSize: "md", contrast: "normal" }

// --- Grade Data ---
const student1GradesRaw = [
  { subject: "Programming", assignment1: 15, assignment2: 18, test1: 16, test2: 14, exam: 17 },
  { subject: "Data Structures", assignment1: 12, assignment2: 14, test1: 11, test2: 13, exam: 10 },
  { subject: "Networks", assignment1: 18, assignment2: 19, test1: 17, test2: 20, exam: 18 },
]
const student2GradesRaw = [
  { subject: "Programming", assignment1: 13, assignment2: 15, test1: 14, test2: 12, exam: 11 },
  { subject: "Web Development", assignment1: 19, assignment2: 20, test1: 18, test2: 19, exam: 20 },
]
const student3GradesRaw = [
  { subject: "Management", assignment1: 18, assignment2: 16, test1: 17, test2: 15, exam: 19 },
  { subject: "Marketing", assignment1: 14, assignment2: 15, test1: 13, test2: 16, exam: 14 },
  { subject: "Business Law", assignment1: 17, assignment2: 18, test1: 16, test2: 19, exam: 15 },
]
const student4GradesRaw = [
  { subject: "Financial Accounting", assignment1: 19, assignment2: 18, test1: 20, test2: 17, exam: 18 },
  { subject: "Cost Accounting", assignment1: 10, assignment2: 12, test1: 9, test2: 11, exam: 13 },
  { subject: "Auditing", assignment1: 15, assignment2: 16, test1: 14, test2: 17, exam: 16 },
]

export const mockData = {
  students: [
    {
      id: "std001",
      role: "student",
      name: "Ana Clara",
      age: 21,
      email: "ana.clara@uniconnect.ac.mz",
      bio: "Computer Science student passionate about AI and web development.",
      year: 3,
      faculty: "Computer Science",
      grades: student1GradesRaw.map((g) => ({ ...g, average: calculateAverage(g) })),
      schedule: [
        { day: "Monday", time: "08:00 - 10:00", subject: "Programming", lecturer: "Dr. Silva", room: "A101" },
        { day: "Tuesday", time: "10:00 - 12:00", subject: "Data Structures", lecturer: "Dr. Costa", room: "B203" },
        { day: "Wednesday", time: "14:00 - 16:00", subject: "Networks", lecturer: "Dr. Santos", room: "C305" },
      ],
      paymentStatus: "Paid",
      paymentHistory: [
        { month: "January", amount: "5670 Mts", date: "2025-01-05", status: "Paid" },
        { month: "February", amount: "5670 Mts", date: "2025-02-04", status: "Paid" },
        { month: "March", amount: "5670 Mts", date: "2025-03-06", status: "Paid" },
      ],
      notificationPreferences: defaultNotificationPrefs,
      accessibilitySettings: defaultAccessSettings,
    },
    {
      id: "std002",
      role: "student",
      name: "Bruno Gomes",
      age: 22,
      email: "bruno.gomes@uniconnect.ac.mz",
      bio: "Future full-stack developer.",
      year: 2,
      faculty: "Computer Science",
      grades: student2GradesRaw.map((g) => ({ ...g, average: calculateAverage(g) })),
      schedule: [
        { day: "Monday", time: "08:00 - 10:00", subject: "Programming", lecturer: "Dr. Silva", room: "A101" },
        { day: "Thursday", time: "13:00 - 15:00", subject: "Web Development", lecturer: "Dr. Almeida", room: "Lab 3" },
      ],
      paymentStatus: "Unpaid",
      paymentHistory: [
        { month: "January", amount: "5670 Mts", date: "2025-01-08", status: "Paid" },
        { month: "February", amount: "5670 Mts", date: "2025-02-09", status: "Paid" },
        { month: "March", amount: "5670 Mts", date: "N/A", status: "Unpaid" },
      ],
      notificationPreferences: defaultNotificationPrefs,
      accessibilitySettings: defaultAccessSettings,
    },
    {
      id: "std003",
      role: "student",
      name: "Carla Dias",
      age: 20,
      email: "carla.dias@uniconnect.ac.mz",
      bio: "Aspiring business leader and entrepreneur.",
      year: 2,
      faculty: "Business Management",
      grades: student3GradesRaw.map((g) => ({ ...g, average: calculateAverage(g) })),
      schedule: [
        { day: "Monday", time: "10:00 - 12:00", subject: "Management", lecturer: "Prof. Ferreira", room: "D201" },
        { day: "Wednesday", time: "08:00 - 10:00", subject: "Marketing", lecturer: "Prof. Lima", room: "D202" },
      ],
      paymentStatus: "Paid",
      paymentHistory: [
        { month: "January", amount: "5670 Mts", date: "2025-01-04", status: "Paid" },
        { month: "February", amount: "5670 Mts", date: "2025-02-03", status: "Paid" },
        { month: "March", amount: "5670 Mts", date: "2025-03-05", status: "Paid" },
      ],
      notificationPreferences: defaultNotificationPrefs,
      accessibilitySettings: defaultAccessSettings,
    },
    {
      id: "std004",
      role: "student",
      name: "David Martins",
      age: 23,
      email: "david.martins@uniconnect.ac.mz",
      bio: "Detail-oriented accounting student aiming for a career in audit.",
      year: 4,
      faculty: "Accounting",
      grades: student4GradesRaw.map((g) => ({ ...g, average: calculateAverage(g) })),
      schedule: [
        { day: "Tuesday", time: "13:00 - 15:00", subject: "Financial Accounting", lecturer: "Dr. Rocha", room: "E105" },
        { day: "Thursday", time: "10:00 - 12:00", subject: "Cost Accounting", lecturer: "Dr. Rocha", room: "E106" },
      ],
      paymentStatus: "Unpaid",
      paymentHistory: [
        { month: "January", amount: "5670 Mts", date: "2025-01-09", status: "Paid" },
        { month: "February", amount: "5670 Mts", date: "2025-02-10", status: "Paid" },
        { month: "March", amount: "5670 Mts", date: "N/A", status: "Unpaid" },
      ],
      notificationPreferences: defaultNotificationPrefs,
      accessibilitySettings: defaultAccessSettings,
    },
  ],
  lecturers: [
    {
      id: "lec001",
      role: "lecturer",
      name: "Dr. Silva",
      age: 45,
      email: "silva.phd@uniconnect.ac.mz",
      bio: "Professor of Computer Science with 15 years of experience. Specializes in algorithms and programming paradigms.",
      assignedCourses: ["Programming", "Data Structures", "Web Development"],
      notificationPreferences: defaultNotificationPrefs,
      accessibilitySettings: defaultAccessSettings,
    },
    {
      id: "lec002",
      role: "lecturer",
      name: "Prof. Ferreira",
      age: 50,
      email: "ferreira.prof@uniconnect.ac.mz",
      bio: "Expert in business strategy and organizational management.",
      assignedCourses: ["Management", "Marketing", "Business Law"],
      notificationPreferences: defaultNotificationPrefs,
      accessibilitySettings: defaultAccessSettings,
    },
    {
      id: "lec003",
      role: "lecturer",
      name: "Dr. Rocha",
      age: 48,
      email: "rocha.phd@uniconnect.ac.mz",
      bio: "Certified Public Accountant and lecturer with a focus on financial reporting standards.",
      assignedCourses: ["Financial Accounting", "Cost Accounting", "Auditing"],
      notificationPreferences: defaultNotificationPrefs,
      accessibilitySettings: defaultAccessSettings,
    },
  ],
  coordinators: [
    {
      id: "coord001",
      role: "coordinator",
      name: "Prof. Mendes",
      age: 52,
      email: "mendes.coord@uniconnect.ac.mz",
      bio: "Coordinator for the Faculty of Computer Science. Ensuring academic excellence and student success.",
      notificationPreferences: defaultNotificationPrefs,
      accessibilitySettings: defaultAccessSettings,
    },
  ],
  notifications: [
    {
      id: "notif001",
      title: "Final Exam Schedule Published",
      content:
        "The final exam schedule for the current semester has been published. Please check your schedule page for details.",
      sender: "Administration",
      urgency: "High",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    },
    {
      id: "notif002",
      title: "Assignment 2 Graded",
      content: "Your grades for Assignment 2 in Programming have been updated.",
      sender: "Dr. Silva",
      course: "Programming",
      urgency: "Medium",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
      id: "notif003",
      title: "Library Maintenance",
      content: "The main library will be closed this weekend for system maintenance.",
      sender: "Administration",
      urgency: "Low",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    },
    {
      id: "notif004",
      title: "Guest Lecture: Business Ethics",
      content: "There will be a guest lecture on Business Ethics this Wednesday at 3 PM in the main auditorium.",
      sender: "Prof. Ferreira",
      course: "Management",
      urgency: "Medium",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    },
  ],
}

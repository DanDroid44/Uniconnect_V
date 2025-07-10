"use client"

import type React from "react"

import { useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppContext } from "@/app/context/app-provider"
import { Sidebar } from "./components/sidebar"
import { Header } from "./components/header"
import { Loader2 } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { role, user, loading } = useContext(AppContext)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !role) {
      router.replace("/login")
    }
  }, [role, loading, router])

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">{children}</main>
      </div>
    </div>
  )
}
